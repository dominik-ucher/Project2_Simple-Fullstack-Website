import React, { useEffect, useState } from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom"
import  Sidebar  from '../../components/Sidebar/Sidebar.jsx'
import { Card, Button } from 'flowbite-react';
import axios from 'axios';
import moment from 'moment'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext'
import DOMPurify from "dompurify";
import './Single_News.css'

const Single_News = () => {

  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [nyhet, setNyhet] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const nyhetId = location.pathname.split("/")[2].split("_")[0];
  const { currentUser } = useContext(AuthContext);
  const [nyheter, setNyheter] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/api/nyheter/');
        setNyheter(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/nyheter/${nyhetId}`,{withCredentials: true,});
        setNyhet(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [nyhetId]);

  const handleDelete = async ()=>{
    try {
      await axiosInstance.delete(`/api/nyheter/${nyhetId}`,{withCredentials: true,});
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


    return(
        <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-7 bg-white-200">
        <div className='single px-10'>
        <h1 className='flex items-center justify-center mt-14 mb-14 font-bold capitalize text-3xl md:text-4xl'>{nyhet.title}</h1>
            <div className='content flex justify-center '> {/* LA TIL FLEX OG JUSTIFY-CENTER HER. KAN BYTTES ETTERPÅ */}
                <img 
                className='rounded-3xl'
                src={nyhet.img && `/upload/Nyheter/Nyheter_Bilder/${nyhet.img}`} 
                alt="" 
                />
            </div>
            <div className='user'>
                <div className='edit flex items-center mt-4'>
                    <img className="rounded-full" src={Logo} alt="" style={{ width: '80px', height: '50px' }}/>
                    <div>
                    <h1 className='px-4'>{nyhet.username}</h1>
                    <h2 className='px-4'>Posted {moment(nyhet.date).fromNow()}</h2>
                    </div>
                    {currentUser && (
                    <>
                    <Link to={`/write_news?edit=2`} state={nyhet}>
                    <img className="w-10 h-10 cursor-pointer" src={editicon} alt="" />
                    </Link>
                    <img onClick={handleDelete} className="w-10 h-10 cursor-pointer" src={deleteicon} alt="" />
                    </>
                    )}
                </div>
            </div>
            <div className="text-black flex flex-col mt-10 my-special-content">
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nyhet.desc).replace(/<a/g, '<a class="text-blue-500 underline"') }}></p>
            </div>
        </div>
        </div>
        <div className="col-span-10 md:col-span-3 bg-white-200">
          <h1 className='text-2xl flex justify-center font-bold mt-6'>Andre Nyheter</h1>
          {nyheter && nyheter.slice(0,4).map((nyhet, index) => (
              <div className="flex flex-col items-center text-lg text-black font-bold hover:text-yellow-300 p-6">
                <Link key={nyhet.id} to={`/nyheter/${nyhet.id}_${nyhet.title}`}>
                <div className="relative overflow-hidden transform transition-all duration-300 rounded-lg hover:scale-105">
                <img
                  className="object-cover h-48 w-96 rounded-3xl"
                  src={`../upload/Nyheter/Nyheter_Bilder/${nyhet.img}`}
                  alt=""
                />
                </div>
                <p className='line-clamp-3 p-2 flex justify-center'>{nyhet.title}</p>
                </Link>
              </div>
            ))}
          {/* {nyheter && nyheter.slice(1, 5).map((nyhet1, index) => (
              <Link to={`/nyheter/${nyhet1.id}_${nyhet1.title}`} key={nyhet1.id}>
                <div>
                  <Card className="max-w-sm mt-10">
                    <img
                      className="object-cover h-48 w-96"
                      src={`../upload/Nyheter/Nyheter_Bilder/${nyhet1.img}`}
                      alt=""
                    />
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p className='line-clamp-3'>{nyhet1.title}</p>
                    </h5>
                    <div className="overflow-hidden text-gray-700 dark:text-gray-400">
                      <div className="h-10" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<span>${nyhet1.desc}</span>`) }}></div>
                    </div>
                    <Button gradientDuoTone='redToYellow' outline className="flex"><h2>Les mer</h2></Button>
                  </Card>
                </div>
              </Link>
            ))} */}
        </div>
        </div>
    )
}

export default Single_News