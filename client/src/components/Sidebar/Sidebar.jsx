import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import menuicon from '../../img/menu.png';
import articleicon from '../../img/article.png';

const SidebarComponent = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

  useEffect(() => {
    // Fetch the sidebar menu items and all pages from the backend
    Promise.all([
      axiosInstance.get('/api/sidebar/menus'),
      axiosInstance.get('/api/sider/')
    ])
      .then(([sidebarResponse, pagesResponse]) => {
        setSidebarMenus(sidebarResponse.data);
        setPages(pagesResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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

  const renderPageList = () => {
    return (
      <div className="pl-8">
        {pages && pages
          .filter((page) => !page.sidebar_id) // Filter pages without a sidebar ID
          .map((page) => (
            <div
              key={page.id}
              className={`flex items-center gap-2 pl-2 mt-2 cursor-pointer text-base ${
                location.pathname.includes(`/side/${page.id}`) ? 'font-bold' : ''
              }`}
              onClick={() => navigate(`/side/${page.id}_${page.title}`)}
            >
              <img src={articleicon} alt="Article Icon" className="w-5 h-5" />
              <span>{page.title}</span>
            </div>
          ))}
      </div>
    );
  };

  const toggleDropdown = (menuId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  const renderPagesForMenu = (menuId) => {
    return (
      <div className="pl-8">
        {pages && pages
          .filter((page) => page.sidebar_id === menuId || (!page.sidebar_id && menuId === null))
          .map((page) => (
            <div
              key={page.id}
              className={`flex items-center gap-2 pl-2 mt-2 cursor-pointer text-base ${
                location.pathname.includes(`/side/${page.id}`) ? 'font-bold' : ''
              }`}
              onClick={() => navigate(`/side/${page.id}_${page.title}`)}
            >
              <img src={articleicon} alt="Article Icon" className="w-5 h-5" />
              <span>{page.title}</span>
            </div>
          ))}
      </div>
    );
  };

  const renderMenuItems = (menus, parentId = null) => {
    return menus && menus
      .filter((menu) => menu.parent_id === parentId)
      .map((menu) => (
        <div key={menu.id} className="pl-4">
          <div
            className={`flex items-center gap-4 mt-2 p-2 cursor-pointer hover:bg-gray-100 rounded-lg ${
              parentId === null ? 'text-xl font-bold' : 'text-base'
            }`}
            onClick={() => toggleDropdown(menu.id)}
          >
            <img src={menuicon} alt="Menu Icon" className="w-5 h-5" />
            <span className="text-base font-bold">{menu.name}</span>
            {dropdownOpen[menu.id] ? (
              <BiChevronUp className="text-gray-500" />
            ) : (
              <BiChevronDown className="text-gray-500" />
            )}
          </div>
          {/* Render submenus inside the main menu dropdown */}
          {dropdownOpen[menu.id] && (
            <div className="pl-4">
              {/* Render pages associated with the current menu as submenus */}
              {renderPagesForMenu(menu.id)}
              {/* Recursively render submenus for the current menu */}
              {renderMenuItems(menus, menu.id)}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="sidebar bg-gray-200 gap-5 mt-5 rounded-lg justify-center min-h-screen overflow-y-auto pb-10">
      <div className="flex flex-col items-center">
        <h1 className="text-center mt-10 text-3xl font-bold">Meny</h1>

        {/* List of Menus */}
        <div className="mt-10 text-lg w-full px-5">
          {renderMenuItems(sidebarMenus)}
          {/* Render pages without sidebar_id */}
          {renderPageList()}
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;