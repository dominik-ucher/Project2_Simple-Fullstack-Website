'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Navbar,Dropdown, Button } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Navbar.css'
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import menuicon from '../../img/menu.png';
import articleicon from '../../img/article.png';

export default function DefaultNavbar() {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

  const {currentUser, logout} = useContext(AuthContext);
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
      <div className="pl-8 p-2">
        {pages && pages
          .filter((page) => !page.sidebar_id) // Filter pages without a sidebar ID
          .map((page) => (
            <div
              key={page.id}
              className={`flex text-white text-md items-center gap-2 pl-2 mt-2 cursor-pointer text-base ${
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
              className={`flex items-center gap-2 pl-2 mt-2 text-white cursor-pointer text-sm text-base ${
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
        <div key={menu.id} className="pl-4 p-2">
          <div
            className={`flex items-center text-white gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded-lg ${
              parentId === null ? 'text-xl font-bold' : 'text-base'
            }`}
            onClick={() => toggleDropdown(menu.id)}
          >
            <img src={menuicon} alt="Menu Icon" className="w-5 h-5" />
            <span className="text-base font-bold text-md">{menu.name}</span>
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


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/navbar/`);
        setLinks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className='flex items-center bg-gray-800 h-auto w-screen border-b-2 border-yellow-300'>
      <div className='flex items-center p-4'>
        <button className='hover:border-2 rounded-2xl p-2'><p>Toggle</p></button>
        <Link className="flex items-center" to="/">
        <img className="w-20" src={Logo} alt="" />
        <p className='font-bold text-white text-xl px-2'>Idrettslaget Trond</p>
        </Link>
      </div>

      <div className='invisible md:visible flex items-center absolute right-0 p-4'>
      {links && links.map((link, index)=> (
          <Link key={link.id} className='text-sm text-white p-2' to={link.link}>{link.name}</Link>
        ))}
        {currentUser && <Link className="text-sm text-white p-2" to="/admin">Admin Side</Link>}
        {currentUser && <span className='font-bold underline text-sm text-white p-2'>Welcome {currentUser.username}</span>}
        {currentUser && <Button color="warning" pill onClick={handleLogout}>Logout</Button>}
      </div>
    </div>
    
      <div className='w-64 h-auto bg-gray-800 relative rounded-br-3xl border-r-2 border-b-2 border-yellow-300' style={{ position: 'absolute', zIndex: '9999' }}>
        <div>
          <div className='visible md:invisible md:h-0 h-auto flex flex-col jusitfy-center items-center bg-gray-700 border-b-2'>
            {links && links.map((link, index)=> (
              <Link key={link.id} className='text-sm text-white p-2' to={link.link}>{link.name}</Link>
            ))}
          </div>
          <div className="w-auto mb-4">
            {renderMenuItems(sidebarMenus)}
            {renderPageList()}
          </div>
        </div>
      </div>

    </>




    // <Navbar
    //   fluid
    //   className='custom-navbar h-20'
    // >
    //   <Navbar.Brand href="/">
    //     <img
    //       alt="Logo"
    //       className="mr-3 h-8 sm:h-16"
    //       src={Logo}
    //     />
    //     <span className="text-navbar self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //       Idrettslaget Trond
    //     </span>
    //   </Navbar.Brand>
    //   <Navbar.Toggle />
    //   <Navbar.Collapse className='z-20 navbar-link px-10'>
    //     {links && links.map((link, index)=> (
    //       <Link key={link.id} className='text-md' to={link.link}>{link.name}</Link>
    //     ))}
    //     {currentUser && <Link to="/admin">Admin Side</Link>}
    //     {currentUser && <span className='font-bold underline text-md'>Welcome {currentUser.username}</span>}
    //     {currentUser && <Button color="warning" pill onClick={handleLogout}>Logout</Button>}
    //   </Navbar.Collapse>
    // </Navbar>
  )
}


