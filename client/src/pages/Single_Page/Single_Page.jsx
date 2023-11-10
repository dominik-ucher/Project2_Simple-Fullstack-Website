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
import './Single_Page.css'

const Single_Page = () => {


  const [side, setSide] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const sideId = location.pathname.split("/")[2].split("_")[0];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/sider/${sideId}`,{withCredentials: true,});
        setSide(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [sideId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/api/sider/${sideId}`,{withCredentials: true,});
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const renderFileLinks = () => {
    if (side.file) {
      const filesArray = side.file.split(','); // Split the file string into an array
      return filesArray.map((fileName, index) => {
        const displayName = fileName.split('__')[1];
        return (
          <a
            key={index}
            className='text-black flex items-center mt-2 px-10 underline'
            href={`/upload/Sider/Sider_Filer/${fileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {displayName}
          </a>
        );
      });
    }
    return null;
  };



    return(
        <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-7 bg-white-200">
        <div className='single'>
            <div className='content'>
                <img 
                className='w-100 h-auto mt-4 px-4'
                src={side.img && `/upload/Sider/Sider_Bilder/${side.img}`} 
                alt="" 
                />
            </div>
            <div className='user'>
                <div className='edit flex items-center mt-4 px-4'>
                    <img className="rounded-full" src={Logo} alt="" style={{ width: '80px', height: '50px' }}/>
                    <div>
                    <h1 className='px-4'>{side.username}</h1>
                    <h2 className='px-4'>Posted {moment(side.date).fromNow()}</h2>
                    </div>
                    {currentUser && (
                    <>
                    <Link to={`/write_page?edit=2`} state={side}>
                    <img className="w-10 h-10 cursor-pointer" src={editicon} alt="" />
                    </Link>
                    <img onClick={handleDelete} className="w-10 h-10 cursor-pointer" src={deleteicon} alt="" />
                    </>
                    )}
                </div>
            </div>
            <h1 className='flex items-center justify-center mt-20 font-bold capitalize text-3xl'>{side.title}</h1>
            <div className="text-black flex flex-col mt-10 px-10 my-special-content">
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(side.desc) }}></p>
            </div>

        </div>
        <div className='mt-10 '>
        {renderFileLinks()}
        </div>
        </div>
        <div className="col-span-10 md:col-span-3 bg-white-200">
                <Sidebar />
        </div>
        </div>
    )
}

export default Single_Page