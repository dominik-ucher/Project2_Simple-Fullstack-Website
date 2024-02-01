import React, { useEffect, useState } from 'react';
'use client';
import { Footer } from 'flowbite-react';
import Logo from '../../img/logo.png'
import './Footer.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

const FooterTemp = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [hovedsponsors, setHovedsponsors] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/sponsor').then((response) => {
      const sponsors = response.data;
      const hovedSponsors = sponsors.filter((sponsor) => sponsor.type === 'Hoved');
  
      setHovedsponsors(hovedSponsors);
    });
  }, []);

    return (
      <>
      <div className='md:block hidden pt-16'>
      <div className='flex flex-col h-auto bg-gray-800 overflow-hidden flex-shrink-0'>
        <div className='text-md text-white flex pt-6 pb-6'>
        <div className='flex justify-start'>
        {hovedsponsors && hovedsponsors.map((sponsor) => (
              <div key={sponsor.id} className='px-4'>
                <Link to={sponsor.link}>
                  <Footer.Brand className="flex rounded-xl w-32 h-auto" src={`../../../upload/Sponsor_Bilder/${sponsor.img}`} alt="Logo" />
                </Link>
              </div>
            ))}
          </div>
          <Link to="/treninger" className='hover:underline ml-auto'>Baneplan</Link>
          <Link to="/sponsorer" className='hover:underline ml-4'>Våre Sponsorer</Link>
          <Link to="/nyheter" className='hover:underline ml-4'>Nyheter</Link>
          <Link to="/kontakt" className='hover:underline ml-4'>Kontakt</Link>
          <Link to="https://www.facebook.com/iltrondfotball" className='hover:underline ml-4'><FaFacebook color="white" className='w-6 h-auto'/></Link>
          <Link to="https://www.instagram.com/il_trondfotball/" className='hover:underline px-4'><FaInstagram color="white" className='w-6 h-auto'/></Link>
        </div>
        <div className='flex justify-center'>
        <div className="w-11/12 h-px bg-white"></div>
        </div>
        <div className='flex justify-center text-md text-gray-400 pt-6 pb-6'>
          <FaRegCopyright color="gray" className="mr-2 pt-1 h-auto" />
          <Link to="/" className='hover:underline'>2024 Idrettslaget Trond</Link>
        </div>
      </div>
      </div>

      <div className='block md:hidden pt-16'>
        <div className='flex flex-col h-auto bg-gray-800 overflow-hidden flex-shrink-0'>
          <div className='text-md text-white flex flex-col p-4'>
            <div className='flex flex-wrap justify-center'>
              {hovedsponsors && hovedsponsors.map((sponsor) => (
                <div key={sponsor.id} className='px-2 py-2'>
                  <Link to={sponsor.link}>
                    <Footer.Brand className="flex rounded-xl w-24 h-auto" src={`../../../upload/Sponsor_Bilder/${sponsor.img}`} alt="Logo" />
                  </Link>
                </div>
              ))}
            </div>
            <div className='flex flex-col items-center mt-4'>
              <Link to="/treninger" className='hover:underline mb-2'>Baneplan</Link>
              <Link to="/sponsorer" className='hover:underline mb-2'>Våre Sponsorer</Link>
              <Link to="/nyheter" className='hover:underline mb-2'>Nyheter</Link>
              <Link to="/kontakt" className='hover:underline mb-2'>Kontakt</Link>
              <Link to="https://www.facebook.com/iltrondfotball" className='hover:underline mb-2'><FaFacebook color="white" className='w-6 h-auto'/></Link>
              <Link to="https://www.instagram.com/il_trondfotball/" className='hover:underline mb-2'><FaInstagram color="white" className='w-6 h-auto'/></Link>
            </div>
          </div>
          <div className='flex justify-center'>
          <div className="w-11/12 h-px bg-white"></div>
          </div>
          <div className='flex justify-center text-md text-gray-400 pt-6 pb-6'>
          <FaRegCopyright color="gray" className="mr-2 pt-1 h-auto" />
          <Link to="/" className='hover:underline'>2024 Idrettslaget Trond</Link>
        </div>
        </div>
      </div>
      </>



    // <div className="flex-grow mt-20">
    // <Footer container className='footer_1' bgDark>
    //   <div className="w-full text-center" >
    //     <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
    //       <div className='flex justify-end'>
    //       {hovedsponsors && hovedsponsors.map((sponsor) => (
    //         <div key={sponsor.id}>
    //           <Link to={sponsor.link}>
    //             <Footer.Brand className="flex rounded-xl w-32 h-auto" src={`../../../upload/Sponsor_Bilder/${sponsor.img}`} alt="Logo" />
    //           </Link>
    //         </div>
    //       ))}
    //       </div>
    //       <Footer.LinkGroup className='txt_1'>
    //         <Link to="/treninger" className='px-2 hover:underline text-white'>Baneplan</Link>
    //         <Link to="/sponsorer" className='px-2 hover:underline text-white'>Våre Sponsorer</Link>
    //         <Link to="/nyheter" className='px-2 hover:underline text-white'>Nyheter</Link>
    //         <Link to="/kontakt" className='hover:underline px-2 text-white'>Kontakt</Link>
    //         <Link to="https://www.facebook.com/iltrondfotball" className='hover:underline px-2'><FaFacebook color="white" className='w-6 h-auto'/></Link>
    //         <Link to="https://www.instagram.com/il_trondfotball/" className='hover:underline px-2'><FaInstagram color="white" className='w-6 h-auto'/></Link>
    //       </Footer.LinkGroup>
    //     </div>
    //     <Footer.Divider />
    //     <Footer.Copyright
    //       className='copyright_1'
    //       by="Idrettslaget Trond"
    //       href="/"
    //       year={2024}
    //     />
    //   </div>
    // </Footer>
    // </div>
    )
}

export default FooterTemp