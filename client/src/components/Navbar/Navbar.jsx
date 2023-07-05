'use client';
import react from 'react';
import { Navbar,Dropdown } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Navbar.css'

export default function DefaultNavbar() {
  return (
    <Navbar
      fluid
      className='custom-navbar h-20'
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt="Logo"
          className="mr-3 h-8 sm:h-16"
          src={Logo}
        />
        <span className="text-navbar self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Idrettslaget Trond
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='navbar-link'>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Dropdown inline label="About" >
          <Dropdown.Item >
            <Navbar.Link active href="#">
            About
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link active href=''>
            Testing
            </Navbar.Link>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Link href="#">
          <p>Contact</p>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


