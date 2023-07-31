// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react'; // Renamed import

const SidebarComponent = () => {

  return (
    <div className='flex justify-center item-center mt-5'>
      <FlowbiteSidebar aria-label="Sidebar with multi-level dropdown example">
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item href="#"><p>Dashboard</p></FlowbiteSidebar.Item>

            <FlowbiteSidebar.Collapse label="E-commerce">
              <FlowbiteSidebar.Item>Products</FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item>Sales</FlowbiteSidebar.Item>
              <FlowbiteSidebar.Collapse label="E-commerce">
                <FlowbiteSidebar.Item>Products</FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item>Sales</FlowbiteSidebar.Item>
              </FlowbiteSidebar.Collapse>
            </FlowbiteSidebar.Collapse>

            <FlowbiteSidebar.Collapse label="E-commerce">
              <FlowbiteSidebar.Item>Products</FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item>Sales</FlowbiteSidebar.Item>
            </FlowbiteSidebar.Collapse>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
      </FlowbiteSidebar>
    </div>
  );
};

export default SidebarComponent;
