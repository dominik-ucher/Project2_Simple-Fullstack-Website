import React, { useEffect, useState } from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom"
import  Sidebar  from '../../components/Sidebar/Sidebar.jsx'
import { Card } from 'flowbite-react';
import axios from 'axios';
import moment from 'moment'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext'
import DOMPurify from "dompurify";

const Single_Page = () => {
    const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
    const [hovedsponsors, setHovedsponsors] = useState([]);
    const [gullsponsors, setGullsponsors] = useState([]);
    const [solvsponsors, setSolvsponsors] = useState([]);
    const [bronsesponsors, setBronsesponsors] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/sponsor').then((response) => {
          const sponsors = response.data;
          const hovedSponsors = sponsors.filter((sponsor) => sponsor.type === 'Hoved');
          const gullSponsors = sponsors.filter((sponsor) => sponsor.type === 'Gull');
          const solvSponsors = sponsors.filter((sponsor) => sponsor.type === 'Solv');
          const bronseSponsors = sponsors.filter((sponsor) => sponsor.type === 'Bronse');
      
          setHovedsponsors(hovedSponsors);
          setGullsponsors(gullSponsors);
          setSolvsponsors(solvSponsors);
          setBronsesponsors(bronseSponsors);
        });
      }, []);



    return(
        <div className="grid grid-cols-10 gap-4">
      <div className="col-span-10 md:col-span-10 bg-white-200">
        <h1 className='font-bold text-3xl flex justify-center mt-10'>Våre sponsorer</h1>
        <div id='hovedsponsor' className='grid grid-cols-2 gap-4 mt-5 px-5'>
          {hovedsponsors && hovedsponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Link to={sponsor.link}>
                <img src={`../../upload/Sponsor_Bilder/${sponsor.img}`} alt={sponsor.type} className='w-full rounded-xl p-6' />
              </Link>
            </div>
          ))}
        </div>


        <div id='gullsponsor' className='grid grid-cols-3 gap-4 gap-4 mt-5 px-5'>
          {gullsponsors && gullsponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Link to={sponsor.link}>
                <img src={`../../upload/Sponsor_Bilder/${sponsor.img}`} alt={sponsor.type} className='w-full rounded-xl' />
              </Link>
            </div>
          ))}
        </div>


        <div id='solvsponsor' className='grid grid-cols-4 gap-4 gap-4 mt-5 px-5'>
          {solvsponsors && solvsponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Link to={sponsor.link}>
                <img src={`../../upload/Sponsor_Bilder/${sponsor.img}`} alt={sponsor.type} className='w-full rounded-xl' />
              </Link>
            </div>
          ))}
        </div>


        <div id='bronsesponsor' className='grid grid-cols-5 gap-4 gap-4 mt-5 px-5'>
          {bronsesponsors && bronsesponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Link to={sponsor.link}>
                <img src={`../../upload/Sponsor_Bilder/${sponsor.img}`} alt={sponsor.type} className='w-full rounded-xl' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>

    )
}

export default Single_Page