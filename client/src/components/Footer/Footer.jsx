import React, { useEffect, useState } from 'react';
'use client';
import { Footer } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Footer.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

const FooterTemp = () => {
  const [hovedsponsors, setHovedsponsors] = useState([]);

  useEffect(() => {
    axios.get('/api/sponsor').then((response) => {
      const sponsors = response.data;
      const hovedSponsors = sponsors.filter((sponsor) => sponsor.type === 'Hoved');
  
      setHovedsponsors(hovedSponsors);
    });
  }, []);

    return (
        // For space between the footer
    // <div className="min-h-screen flex flex-col">
    <div className="flex-grow mt-20">
    {/* </div> */}
    <Footer container className='footer_1'>
      <div className="w-full text-center" >
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className='flex justify-end'>
          {hovedsponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Link to={sponsor.link}>
                <Footer.Brand className="flex rounded-xl w-32 h-auto" src={`../../../upload/Sponsor_Bilder/${sponsor.img}`} alt="Logo" />
              </Link>
            </div>
          ))}
          </div>
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
          by="Idrettslaget Trond"
          href="#"
          year={2024}
        />
      </div>
    </Footer>
    </div>
    )
}

export default FooterTemp