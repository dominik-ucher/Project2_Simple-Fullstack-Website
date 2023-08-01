import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);

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
  }, []);

  useEffect(() => {
    // Get the current article's menu and set its dropdown to open
    const currentPath = location.pathname;
    const currentPage = pages.find((page) => currentPath.includes(`/side/${page.id}`));
    if (currentPage) {
      setActiveMenuId(currentPage.sidebar_id);
    }
  }, [pages, location.pathname]);

  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (menuId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  const renderMenuItems = (menus, parentId = null, level = 0) => {
    return menus
      .filter((menu) => menu.parent_id === parentId)
      .map((menu) => (
        <div key={menu.id} className="pl-4">
          <div
            className={`flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg ${
              level === 0 ? 'text-xl font-bold' : 'text-lg'
            }`}
            onClick={() => toggleDropdown(menu.id)}
          >
            <span>{menu.name}</span>
            {dropdownOpen[menu.id] ? (
              <BiChevronUp className="text-gray-500" />
            ) : (
              <BiChevronDown className="text-gray-500" />
            )}
          </div>
          {/* Render pages under the menu */}
          {dropdownOpen[menu.id] && (
            <div className="pl-8">
              {pages
                .filter((page) => page.sidebar_id === menu.id)
                .map((page) => (
                  <div
                    key={page.id}
                    className={`pl-2 cursor-pointer ${
                      location.pathname.includes(`/side/${page.id}`) ? 'font-bold' : ''
                    }`}
                    onClick={() => navigate(`/side/${page.id}`)}
                  >
                    {page.title}
                  </div>
                ))}
            </div>
          )}
          {renderMenuItems(menus, menu.id, level + 1)}
        </div>
      ));
  };

  return (
    <div className="sidebar bg-gray-200 gap-5 mt-5 rounded-lg justify-center">
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-center mt-10 text-3xl font-bold">Sidebar Menu</h1>

        {/* List of Menus */}
        <div className="mt-10 text-lg">{renderMenuItems(sidebarMenus)}</div>
      </div>
    </div>
  );
};

export default SidebarComponent;
