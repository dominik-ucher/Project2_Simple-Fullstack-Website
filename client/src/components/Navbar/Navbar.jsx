'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Navbar,Dropdown, Button } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Navbar.css'
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function DefaultNavbar() {

  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/navbar/`);
        setLinks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Navbar
      fluid
      className='custom-navbar h-20'
    >
      <Navbar.Brand href="/">
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
        {links.map((link, index)=> (
          <Link key={link.id} className='text-md' to={link.link}>{link.name}</Link>
        ))}
        {currentUser && <Link to="/admin">Admin Side</Link>}
        {currentUser && <span className='font-bold underline text-md'>Welcome {currentUser.username}</span>}
        {currentUser && <Button color="warning" pill onClick={handleLogout}>Logout</Button>}
      </Navbar.Collapse>
    </Navbar>
  )
}


