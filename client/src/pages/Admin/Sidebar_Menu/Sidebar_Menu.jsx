import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Card, Button, Label, TextInput, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';

const Sidebar_Menu = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuname, setMenuname] = useState('');
  const [selectedSidebarId, setSelectedSidebarId] = useState(null);
  const [sidebarMenus, setSidebarMenus] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Fetch the sidebar menu items from the backend
    axiosInstance
      .get('/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        '/api/sidebar/menus/',
        {
          name: menuname,
          parent_id: selectedSidebarId,
        },
        { withCredentials: true }
      );
      // After successful creation, refresh the list of menus
      setMenuname('');
      setSelectedSidebarId(null);
      fetchMenus();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await axiosInstance.delete(`/api/sidebar/menus/${menuId}`, {
        withCredentials: true,
      });
      // After successful deletion, refresh the list of menus
      fetchMenus();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMenus = () => {
    axiosInstance
      .get('/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  };

  const renderMenuItems = (menus, parentId = null, level = 0) => {
    return menus && menus
      .filter((menu) => menu.parent_id === parentId)
      .map((menu) => (
        <div key={menu.id} className="pl-4">
          <div className="flex items-center gap-4">
            <span>{`${'-'.repeat(level)} ${menu.name}`}</span>
            <Button className="mt-4" size="xs" color="failure" onClick={() => handleDeleteMenu(menu.id)}>Slett</Button>
          </div>
          {renderMenuItems(menus, menu.id, level + 1)}
        </div>
      ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto pb-100 mt-5">
      <h1 className="text-center mt-8 text-2xl font-bold">Side Menyen</h1>

      {/* List of Menus */}
      <div className="mt-5">
        <h2 className="text-xl font-bold">Meny:</h2>
        {renderMenuItems(sidebarMenus)}
      </div>

      <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label color="gray" htmlFor="input-gray" value="Meny Navn" />
          </div>
          <TextInput
            color="gray"
            id="input-gray"
            placeholder="Navn"
            required
            value={menuname}
            onChange={(e) => setMenuname(e.target.value)}
          />
        </div>

        <div className="mt-5 px-4" id="select">
          <div className="mb-2 block">
            <Label htmlFor="sidebar" value="Sett undermeny (La være blank hvis det skal være hovedmeny)" />
          </div>
          <Select id="sidebar" required onChange={(e) => setSelectedSidebarId(e.target.value)}>
            <option value={null}>None</option>
            {sidebarMenus && sidebarMenus.map((menu) => (
              <option value={menu.id} key={menu.id}>
                {menu.name}
              </option>
            ))}
          </Select>
        </div>

        <Button type="submit" color="dark" className="mt-5">
          Publiser
        </Button>
      </form>
    </div>
  );
};

export default Sidebar_Menu;
