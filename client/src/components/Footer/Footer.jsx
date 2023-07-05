import React from 'react';
'use client';
import { Footer } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Footer.css'

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
            <Footer.Link href="#" >
              About
            </Footer.Link>
            <Footer.Link href="#">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#">
              Licensing
            </Footer.Link>
            <Footer.Link href="#">
              Contact
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          className='copyright_1'
          by="Flowbite™"
          href="#"
          year={2022}
        />
      </div>
    </Footer>
    </div>
    )
}

export default FooterTemp