import React, { useState } from 'react';
import './Sidebar.css';

const SidebarComponent = () => {
  const [dropdowns, setDropdowns] = useState([
    {
      id: 1,
      label: 'E-commerce',
      isOpen: false,
      submenus: [
        { id: 11, label: 'Products', isOpen: false, submenus: ['Product 1', 'Product 2'] },
        { id: 12, label: 'Sales', isOpen: false, submenus: ['Sale 1', 'Sale 2'] },
      ],
    },
    {
      id: 2,
      label: 'Settings',
      isOpen: false,
      submenus: [
        { id: 21, label: 'General', isOpen: false, submenus: ['Setting 1', 'Setting 2'] },
        { id: 22, label: 'Security', isOpen: false, submenus: ['Security 1', 'Security 2'] },
        { id: 23, label: 'Notifications', isOpen: false, submenus: ['Notification 1', 'Notification 2'] },
      ],
    },
    {
      id: 3,
      label: 'Reports',
      isOpen: false,
      submenus: [
        { id: 31, label: 'Sales Report', isOpen: false, submenus: ['Report 1', 'Report 2'] },
        { id: 32, label: 'Inventory Report', isOpen: false, submenus: ['Report 3', 'Report 4'] },
      ],
    },
  ]);

  const toggleDropdown = (parentId, submenuId) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((parentDropdown) => {
        if (parentDropdown.id === parentId) {
          return {
            ...parentDropdown,
            isOpen: submenuId === null ? !parentDropdown.isOpen : parentDropdown.isOpen,
            submenus: parentDropdown.submenus.map((submenu) =>
              submenu.id === submenuId ? { ...submenu, isOpen: !submenu.isOpen } : { ...submenu, isOpen: false }
            ),
          };
        } else {
          return {
            ...parentDropdown,
            isOpen: false,
            submenus: parentDropdown.submenus.map((submenu) => ({ ...submenu, isOpen: false })),
          };
        }
      })
    );
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h3>Dashboard</h3>
      </div>
      <div className='sidebar-menu'>
        <div className='sidebar-item'>
          <p>Dashboard</p>
        </div>
        {dropdowns.map((parentDropdown) => (
          <div key={parentDropdown.id}>
            <div
              className={`sidebar-item ${parentDropdown.isOpen ? 'active' : ''}`}
              onClick={() => toggleDropdown(parentDropdown.id, null)}
            >
              <div className="arrow-container">
                <p>{parentDropdown.label}</p>
                <i className={`arrow ${parentDropdown.isOpen ? 'up' : 'down'}`}></i>
                <div className={`arrow-right ${parentDropdown.isOpen ? 'visible' : ''}`}></div>
              </div>
            </div>
            {parentDropdown.isOpen && (
              <div className='dropdown-menu'>
                {parentDropdown.submenus.map((submenu) => (
                  <div key={submenu.id}>
                    <div
                      className={`submenu-item ${submenu.isOpen ? 'active' : ''}`}
                      onClick={() => toggleDropdown(parentDropdown.id, submenu.id)}
                    >
                      <p>{submenu.label}</p>
                      <i className={`arrow ${submenu.isOpen ? 'up' : 'down'}`}></i>
                      <div className={`arrow-right ${submenu.isOpen ? 'visible' : ''}`}></div>
                    </div>
                    {submenu.isOpen && (
                      <div className='sub-submenu'>
                        {submenu.submenus.map((subSubmenu) => (
                          <div className='sub-submenu-item' key={subSubmenu}>
                            <p>{subSubmenu}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className='sidebar-item'>
          <p>Products</p>
        </div>
        <div className='sidebar-item'>
          <p>Sales</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
