'use client';
import react from 'react';
import { Navbar,Dropdown } from 'flowbite-react';
import Logo from '../../img/logo.png'

export default function DefaultNavbar() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt="Logo"
          className="mr-3 h-6 sm:h-9"
          src={Logo}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Idrettslaget Trond
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          <p>Home</p>
        </Navbar.Link>
        <Dropdown inline label="About">
          <Dropdown.Item>
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
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


