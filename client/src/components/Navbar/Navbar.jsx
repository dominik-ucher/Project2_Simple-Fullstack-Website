import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png'
import './Navbar.css'

const Navbar = () => {
    return (
    <div className="navbar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <div className="dropdown">
          <button className="dropbtn">Services
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <a href="#service1">Service 1</a>
            <a href="#service2">Service 2</a>
            <a href="#service3">Service 3</a>
          </div>
        </div>
        <a href="#contact">Contact</a>
        <img src={Logo} alt="" className="logo" />
      </div>
    )
}

export default Navbar