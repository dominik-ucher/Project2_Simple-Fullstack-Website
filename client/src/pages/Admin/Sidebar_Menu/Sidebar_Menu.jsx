import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Card, Button, Label, TextInput, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';

const Sidebar_Menu = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL});
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
    axios
      .get('/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  };

  const renderMenuItems = (menus, parentId = null, level = 0) => {
    if (!Array.isArray(menus) || menus.length === 0) {
      return <div>No menus available</div>; // Return a message or component when menus are empty or not an array
    }

    const filteredMenus = menus.filter((menu) => menu && menu.parent_id === parentId);
  
    if (filteredMenus.length === 0) {
      return <div>No menus available</div>; // Return if no matching menus found
    }

    return filteredMenus.map((menu) => (
      <div key={menu.id} className="pl-4">
        <div className="flex items-center gap-4">
          <span>{`${'-'.repeat(level)} ${menu.name}`}</span>
          <Button className="mt-4" size="xs" color="failure" onClick={() => handleDeleteMenu(menu.id)}>
            Delete
          </Button>
        </div>
        {renderMenuItems(menus, menu.id, level + 1)}
      </div>
    ));
  };

  const renderSelectOptions = (menus, parentId = null, level = 0) => {
    if (!Array.isArray(menus) || menus.length === 0) {
      return <option value={null}>None</option>; // Default option when no menus are available
    }

    const filteredMenus = menus.filter((menu) => menu && menu.parent_id === parentId);

    if (filteredMenus.length === 0) {
      return null; // Return null if no matching menus found
    }

    return filteredMenus.map((menu) => (
      <option key={menu.id} value={menu.id}>{`${'-'.repeat(level)} ${menu.name}`}</option>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pb-100 mt-20">
      <h1 className="text-center mt-8 text-2xl font-bold">Sidebar Menu</h1>

      {/* List of Menus */}
      <div className="mt-5">
        <h2 className="text-xl font-bold">Menus:</h2>
        {Array.isArray(sidebarMenus) && sidebarMenus.length > 0 ? (
          renderMenuItems(sidebarMenus)
        ) : (
          <div>No menus available</div>
        )}
      </div>

      <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label color="gray" htmlFor="input-gray" value="Menu name" />
          </div>
          <TextInput
            color="gray"
            id="input-gray"
            placeholder="Input Gray"
            required
            value={menuname}
            onChange={(e) => setMenuname(e.target.value)}
          />
        </div>

        <div className="mt-5 px-4" id="select">
          <div className="mb-2 block">
            <Label htmlFor="sidebar" value="Put under another menu (Leave blank if you want it to be a new one)" />
          </div>
          <Select id="sidebar" required onChange={(e) => setSelectedSidebarId(e.target.value)}>
            <option value={null}>None</option>
            {renderSelectOptions(sidebarMenus)}
          </Select>
        </div>

        <Button type="submit" color="dark" className="mt-5">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default Sidebar_Menu;
