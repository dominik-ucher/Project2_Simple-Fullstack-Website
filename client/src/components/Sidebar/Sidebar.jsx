'use client';
import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import './Sidebar.css'
import { Link } from 'react-router-dom';

export default function MultiLevelDropdown() {
  return (
    <div className='flex justify-center item-center mt-5'>
    <Sidebar aria-label="Sidebar with multi-level dropdown example" className='sidebar_1'>
      <Sidebar.Items className='sidebar_1'>
        <Sidebar.ItemGroup>

          <h1 className='flex items-center justify-center font-bold text-2xl text-blue-700'>Menu</h1>
          
          
          <Link to="">
          <Sidebar.ItemGroup>
          <Sidebar.Collapse label="E-commerce" className='font-bold mt-4 bg-blue-500'>
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item><Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          </Sidebar.ItemGroup>
          </Link>

          <Link to="">
          <Sidebar.ItemGroup>
          <Sidebar.Collapse label="E-commerce" className='font-bold mt-4 bg-blue-500'>
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item><Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          </Sidebar.ItemGroup>
          </Link>

          <Link to="">
          <Sidebar.ItemGroup>
          <Sidebar.Collapse label="E-commerce" className='font-bold mt-4 bg-blue-500'>
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item><Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          </Sidebar.ItemGroup>
          </Link>

          <Link to="">
          <Sidebar.ItemGroup>
          <Sidebar.Collapse label="E-commerce" className='font-bold mt-4 bg-blue-500'>
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item><Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          </Sidebar.ItemGroup>
          </Link>

          <Link to="">
          <Sidebar.ItemGroup>
          <Sidebar.Collapse label="E-commerce" className='font-bold mt-4 bg-blue-500'>
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item><Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          </Sidebar.ItemGroup>
          </Link>
          

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  )
}


