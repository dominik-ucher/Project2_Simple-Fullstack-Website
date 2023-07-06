'use client';
import react, { useContext } from 'react';
import { Navbar,Dropdown } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Navbar.css'
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function DefaultNavbar() {

  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
        {currentUser && <Link to="/admin">Admin Side</Link>}
        {currentUser && <span>Welcome {currentUser.username}</span>}
        {currentUser && (<span className="cursor-pointer" onClick={handleLogout}>Logout</span>)}
      </Navbar.Collapse>
    </Navbar>
  )
}


