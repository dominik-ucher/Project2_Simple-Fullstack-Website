import React from 'react';
'use client';
import { Footer } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Footer.css'
import { Link } from 'react-router-dom';

const FooterTemp = () => {
    return (
        // For space between the footer
    // <div className="min-h-screen flex flex-col">
    <div className="flex-grow mt-20">
    {/* </div> */}
    <Footer container className='footer_1'>
      <div className="w-full text-center" >
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            alt="Logo"
            href="/"
            src={Logo}
          />
          <Footer.LinkGroup className='txt_1'>
            <Link to="" className='px-2'>About</Link>
            <Link to="" className='px-2'>Privacy and Policy</Link>
            <Link to="" className='px-2'>Licensing</Link>
            <Link to="/contact" className='px-2'>Contact</Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          className='copyright_1'
          by="Dominik"
          href="#"
          year={2022}
        />
      </div>
    </Footer>
    </div>
    )
}

export default FooterTemp