import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const SidebarComponent = () => {
  const navigate = useNavigate();
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Fetch the sidebar menu items from the backend
    axios
      .get('http://localhost:8800/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch all pages
    axios
      .get('http://localhost:8800/api/sider/')
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pages', error);
      });
  }, [])

  const renderMenuItems = (menus, parentId = null, level = 0) => {
    return menus
      .filter((menu) => menu.parent_id === parentId)
      .map((menu) => (
        <div key={menu.id} className="pl-4">
          <div className="flex items-center gap-4">
            <span>{`${'-'.repeat(level)} ${menu.name}`}</span>
          </div>
          {/* Render pages under the menu */}
          <div className="pl-8">
            {pages
              .filter((page) => page.sidebar_id === menu.id)
              .map((page) => (
                <div key={page.id} className="pl-2">
                  <span onClick={() => navigate(`/side/${page.id}`)} className="cursor-pointer">
                    {page.title}
                  </span>
                </div>
              ))}
          </div>
          {renderMenuItems(menus, menu.id, level + 1)}
        </div>
      ));
  };

  return (
    <div className='sidebar'>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center mt-8 text-2xl font-bold">Sidebar Menu</h1>

        {/* List of Menus */}
        <div className="mt-5">
          {renderMenuItems(sidebarMenus)}
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
