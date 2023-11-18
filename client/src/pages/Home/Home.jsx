import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { Button, Card } from 'flowbite-react';
import axios from 'axios'
import DOMPurify from 'dompurify';
import './Home.css'

const Home = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

  const [nyheter, setNyheter] = useState([]);
  const [menu, setMenu] = useState([]);
  const [mainpic, setMainpic] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/nyheter/`);
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
        const res = await axiosInstance.get(`/api/homepage_menu/`);
        setMenu(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/homepagepic/`);
        setMainpic(res.data[0] || { id: null, img: '' });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

    return(

        <>

        <img
        className="object-cover h-auto w-full"
        key={mainpic.id}
        src={`../upload/Homepage_Bilder/${mainpic.img}`}
        alt="image description" />
        <div className="relative w-12/14 mx-auto p-4 bg-gray-800 text-white rounded-xl justify-center mt-3">

          <p className="text-2xl justify-center flex items-center">Velkommen til Idrettslaget Trond</p>
          <p className="text-lg mt-2 justify-center flex items-center">Artig-Inkluderende-Utviklende</p>
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-10 md:col-span-7 bg-white-200 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nyheter && nyheter.slice(0,6).map((nyheter,index) => (
                <Link key={nyheter.id} to={`/nyheter/${nyheter.id}_${nyheter.title}`}>
                <div>
                <Card className="max-w-sm mt-10 hover:bg-gray-200">
                <img className="object-cover h-48 w-96" src={`../upload/Nyheter/Nyheter_Bilder/${nyheter.img}`} alt="" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p className='line-clamp-3'>{nyheter.title}</p>
                </h5>
                <p className="line-clamp-3 font-normal text-gray-700 dark:text-gray-400"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(nyheter.desc),}}></p>
                <Button gradientDuoTone='redToYellow' outline className="flex"><h2>Les mer</h2></Button>
                </Card>
                </div>
                </Link>
            ))}

              </div>
              <Link to={"/nyheter/"} className='text-blue-500 hover:underline hover:cursor-pointer hover:font-semibold mt-10 flex justify-center text-xl'>For flere nyheter</Link>
          </div>
          <div className="col-span-10 md:col-span-3 bg-white-300">
            {/* Right Column */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Row */}
                <div className="col-span-2">
                  {/* Content for the first row */}
                  <div className="relative w-12/14 mx-auto p-4 text-white rounded-xl justify-center mt-3 bg-blue-500 hover:bg-blue-900">
                    <Link to="https://www.facebook.com/iltrondfotball" className='pointer'><p className="text-lg justify-center flex items-center">Følg oss på Facebook</p></Link>
                  </div>
                </div>
                {/* Second Row */}
                <div className="col-span-2">
                  {/* Content for the second row */}
                  <h1 className="text-xl font-bold justify-center flex items-center">Nyttig Informasjon</h1>
                </div>
                {/* Third Row */}
                {/* Content for the third row */}
                <div className="col-span-2">
                {menu && menu.map((menu,index) => (
                  <Link key={menu.id} to={menu.link}>
                  <img
                    className="object-cover rounded-lg mt-4"
                    src={`/upload/HomepageMenu_Bilder/${menu.img}`}
                    alt="image description" />
                  </Link>
                ))}
                </div>
                
              </div>
            </div>
          </div>
        </div>
        </>
      

    )
}

export default Home