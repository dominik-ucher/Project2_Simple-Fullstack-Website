'use client';
import react, { useContext } from 'react';
import { Navbar,Dropdown, Button } from 'flowbite-react';
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
      <Navbar.Brand>
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
      <Navbar.Collapse className='z-20 navbar-link px-10'>
        <Link to="/">Home</Link>
        <Link to ="">About</Link>
        <Link to ="/contact">Contact</Link>
        <Link to ="/side/1">Side 1</Link>
        <Link to ="/nyheter/1">Nyhet 1</Link>
        {currentUser && <Link to="/admin">Admin Side</Link>}
        {currentUser && <span className='font-bold underline text-lg'>Welcome {currentUser.username}</span>}
        {currentUser && <Button color="warning" pill onClick={handleLogout}>Logout</Button>}
      </Navbar.Collapse>
    </Navbar>
  )
}


