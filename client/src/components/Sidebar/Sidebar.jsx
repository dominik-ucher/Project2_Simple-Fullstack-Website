// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from 'flowbite-react';


const SidebarComponent = () => {


  return (
    <div className='flex justify-center item-center mt-5'>
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#"><p>Dashboard</p></Sidebar.Item>

          <Sidebar.Collapse  label="E-commerce">
            <Sidebar.Item>Products</Sidebar.Item>
            <Sidebar.Item>Sales</Sidebar.Item>
              <Sidebar.Collapse  label="E-commerce">
                <Sidebar.Item>Products</Sidebar.Item>
                <Sidebar.Item>Sales</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.Collapse>

            <Sidebar.Collapse  label="E-commerce">
            <Sidebar.Item>Products</Sidebar.Item>
            <Sidebar.Item>Sales</Sidebar.Item>
            </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
};

export default SidebarComponent;
