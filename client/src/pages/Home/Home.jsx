import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.png'
import Bane from '../../img/Rosenborgbanen.jpg'
import { Link } from 'react-router-dom'
import { Button, Card } from 'flowbite-react';
import axios from 'axios'
import DOMPurify from 'dompurify';
import FadeIn from 'react-fade-in';
import { Progress } from 'flowbite-react';



const Home = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

  const [nyheter, setNyheter] = useState([]);
  const [menu, setMenu] = useState([]);
  const [mainpic, setMainpic] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // Fetch menus and pages from your backend endpoint
    axios.get('/api/sidebar/menupages')
      .then(response => {
        setMenus(response.data); // Assuming the response contains menus and pages data
      })
      .catch(error => {
        console.error('Error fetching menus and pages:', error);
      });
  }, []);

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
        <FadeIn transitionDuration={1500}>
          <div className='p-6'>
            <div className='relative'>
              <img
                className="object-cover h-auto w-full rounded-3xl"
                key={mainpic.id}
                src={`../upload/Homepage_Bilder/${mainpic.img}`}
                alt="image description"
              />
              <div className="absolute inset-0 bg-gray-800 bg-opacity-75 text-white text-center p-4 rounded-3xl flex flex-col justify-center items-center">
                <p className="text-4xl font-bold sm:text-center lg:text-left">Velkommen til Idrettslaget Trond</p>
                <p className="text-2xl mt-2 font-bold sm:text-center lg:text-left">Artig-Inkluderende-Utviklende</p>
                
                {/* Arrow image */}
                <div className="absolute flex justify-center bottom-0 left-0 right-0 mb-4">
                  <img
                    src="../../../src/img/arrow.png" // Replace with your arrow image path
                    alt="Arrow"
                    className="h-16 w-auto animate-bounce rounded-full" // Adjust the height and width as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-10'>
          {nyheter && nyheter.slice(0,8).map((nyhet, index) => (
              <div className="flex flex-col items-center text-lg text-black font-bold hover:text-yellow-300">
                <Link key={nyhet.id} to={`/nyheter/${nyhet.id}_${nyhet.title}`}>
                <div className="relative overflow-hidden transform transition-all duration-300 rounded-lg hover:scale-105">
                <img
                  className="object-cover h-48 w-96 rounded-3xl"
                  src={`../upload/Nyheter/Nyheter_Bilder/${nyhet.img}`}
                  alt=""
                />
                </div>
                <p className='line-clamp-3 p-2'>{nyhet.title}</p>
                </Link>
              </div>
            ))}
        </div>

        <div className='bg-gray-900 p-6'>
            <p className='flex justify-center font-bold text-3xl text-white'>Nyttig Informasjon</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {menu && menu.map((menu,index) => (
                    <Link key={menu.id} to={menu.link}>
                    <div className='flex justify-center items-center mt-4 transform transition-all duration-300 rounded-lg hover:scale-105'>
                    <img
                      className="object-cover rounded-lg mt-4 h-48"
                      src={`/upload/HomepageMenu_Bilder/${menu.img}`}
                      alt="image description" />
                    </div>
                    </Link>
                  ))}
              </div>
        </div>

        <div className='bg-yellow-300 p-6'>
        <p className='flex justify-center font-bold text-3xl'>Utforsk</p>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {menus.map(menu => (
              <div key={menu.menuName} className='mb-4 mt-10'>
                <p className='flex justify-center font-bold text-2xl'>{menu.menuName}</p>
                <div>
                  {menu.pages.map(page => (
                    <div key={page.pageId} className='p-4'>
                      <Link to={`/side/${page.pageid}_${page.pageTitle}`}>
                      <p className='flex justify-center text-md hover:font-bold hover:underline'>{page.pageTitle}</p>
                      </Link>
                      {/* You can display other details of the page here */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='p-6'>
        <p className='flex justify-center font-bold text-3xl'>En stolt fotballklubb</p>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex justify-center items-center'>
            <img src={Bane} className='rounded-3xl' alt ="" />
          </div>
          <div>
            Progress bars?
          </div>
        </div>
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
                <div className="overflow-hidden text-gray-700 dark:text-gray-400">
                  <div className="h-10" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<span>${nyheter.desc}</span>`) }}></div>
                </div>

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