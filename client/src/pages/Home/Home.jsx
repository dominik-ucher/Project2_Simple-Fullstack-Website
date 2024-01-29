import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.png'
import Bane from '../../img/Rosenborgbanen.jpg'
import { Link } from 'react-router-dom'
import { Button, Card } from 'flowbite-react';
import axios from 'axios'
import DOMPurify from 'dompurify';
import FadeIn from 'react-fade-in';
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { useInView } from 'react-intersection-observer';
import woman from '../../img/woman.png'
import man from '../../img/man.png'
import volunteer from '../../img/volunteer.png'
import team from '../../img/team.png'
import referee from '../../img/referee.png'
import arrow from '../../img/arrow.png'
import sidebargif from '../../img/Sidebar_gif.gif'
import stoltklubb from '../../img/Stoltklubb_bilde.jpg'


function ProgressBar({ name, progress, maxProgress, logo }) {
  const [barWidth, setBarWidth] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    let interval;
    if (inView) {
      const percentage = (progress / maxProgress) * 100;
      interval = setInterval(() => {
        if (barWidth < percentage) {
          setBarWidth(prevWidth => prevWidth + 1);
        } else {
          clearInterval(interval);
        }
      }, 10); // Change the interval duration as needed
    }
    return () => clearInterval(interval);
  }, [barWidth, inView, maxProgress, progress]);

  return (
    <div className='flex flex-col items-start mb-4' ref={ref}>
      <p className='text-lg font-semibold mb-2'>{name}</p>
      <div className='w-full h-12 bg-gray-200 rounded-full overflow-hidden flex items-center relative'>
        <div
          className='bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-width relative'
          style={{ width: `${barWidth > 100 ? 100 : barWidth}%` }}
        >
          <img
            className='w-10 h-10 object-cover absolute rounded-full left-0 transform translate-x-1 translate-y-1'
            src={logo}
            alt={`Progress ${name}`}
          />
        </div>
        <span className='px-2 flex items-center text-lg font-medium text-gray-700'>
          {`${progress}`}
        </span>
      </div>
    </div>
  );
}


const Home = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

  const [nyheter, setNyheter] = useState([]);
  const [menu, setMenu] = useState([]);
  const [mainpic, setMainpic] = useState([]);
  const [menus, setMenus] = useState([]);

  const progressBars = [
    { name: 'Frivillige i klubben', progress: 239, maxProgress: 500, logo: volunteer },
    { name: 'Herrespillere', progress: 330, maxProgress: 500, logo: man },
    { name: 'Kvinnespillere', progress: 148, maxProgress: 300, logo: woman },
    { name: 'Dommere', progress: 22, maxProgress: 50, logo: referee },
    { name: 'Lag', progress: 27, maxProgress: 100, logo: team },
    // Add more objects with different names, progresses, and logos as needed
  ];

  useEffect(() => {
    // Fetch menus and pages from your backend endpoint
    axiosInstance.get('/api/sidebar/menupages')
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
                className="object-cover h-auto w-full rounded-xl"
                key={mainpic.id}
                src={`../upload/Homepage_Bilder/${mainpic.img}`}
                alt="image description"
              />
              <div className="absolute inset-0 bg-gray-800 bg-opacity-75 text-white text-center p-4 rounded-xl flex flex-col justify-center items-center">
                <p className="text-xl md:text-4xl font-bold text-center">Velkommen til Idrettslaget Trond</p>
                <p className="text-md md:text-2xl mt-2 font-bold text-center">Artig-Inkluderende-Utviklende</p>
                
                {/* Arrow image */}
                <div className="absolute flex justify-center bottom-0 left-0 right-0 mb-4">
                  <img
                    src={arrow} // Replace with your arrow image path
                    alt="Arrow"
                    className="h-6 md:h-16 w-auto animate-bounce rounded-full" // Adjust the height and width as needed
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
                  className="object-cover h-48 w-96 rounded-xl"
                  src={`../upload/Nyheter/Nyheter_Bilder/${nyhet.img}`}
                  alt=""
                />
                </div>
                <p className='line-clamp-3 p-2'>{nyhet.title}</p>
                </Link>
              </div>
            ))}
        </div>
        <div className='flex justify-center'>
            {/* <Link to={"/nyheter/"} className='text-blue-500 hover:underline hover:cursor-pointer hover:font-semibold mb-5 text-xl'>Flere nyheter</Link> */}
            <Link to={"/nyheter"}>
            <Button className="mb-5 font-bold" size="md" color="dark" pill>Flere Nyheter <img className='w-12 h-12 rounded-full p-2 -rotate-90' src={arrow} alt="" /></Button>
            </Link>
        </div>

        <div className='p-6 bg-gray-800'>
          <p className='flex justify-center font-bold text-3xl text-white'>Snarveier</p>
          <div className='flex justify-center mt-3'><div className='h-1 w-32 bg-white rounded-full' /></div>
          <div className='flex flex-col items-center gap-6 justify-center mt-10 md:flex-row md:gap-6'>
            <Link to={"/treninger"}> <Button pill size="xl" color="warning">Baneplan</Button> </Link>
            <Link to={"/side/77_Info%20Fotball"}> <Button pill size="xl" color="warning">Fotball</Button> </Link>
            <Link to={"/side/88_Informasjon"}> <Button pill size="xl" color="warning">Allidrett</Button> </Link>
            <Link to={"/side/90_Lån%20og%20Utleie"}> <Button pill size="xl" color="warning">Klubbhuset</Button> </Link>
            <Link to={"/kontakt"}> <Button pill size="xl" color="warning">Kontakt Oss</Button> </Link>
          </div>
          <p className='flex justify-center font-bold text-3xl text-white mt-10'>Eller bruk vår Meny</p>
          <div className='flex justify-center mt-3'><div className='h-1 w-48 bg-white rounded-full' /></div>
          <div className='flex justify-center mt-10'>
            <div className='h-96 w-auto'>
              <img src={sidebargif} alt="" />
              {/* <Sidebar /> */}
            </div>
          </div>
        </div>

        <div className='bg-yellow-300 p-6'>
        <p className='flex justify-center font-bold text-3xl'>Utforsk</p>
        <div className='flex justify-center mt-3'><div className='h-1 w-32 bg-black rounded-full' /></div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {Array.isArray(menus) && menus.map(menu1 => (
              <div key={menu1.menuName} className='mb-4 mt-10'>
                <p className='flex justify-center font-bold text-2xl'>{menu1.menuName}</p>
                <div>
                  {menu1.pages && Array.isArray(menu1.pages) && menu1.pages.map(page => (
                    <div key={page.pageId} className='p-4'>
                        <p className='flex justify-center text-md hover:font-bold hover:underline'><Link to={`/side/${page.pageId}_${page.pageTitle}`}>{page.pageTitle}</Link></p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-gray-800 p-6'>
            <p className='flex justify-center font-bold text-3xl text-white'>Nyttig Informasjon</p>
            <div className='flex justify-center mt-3'><div className='h-1 w-48 bg-white rounded-full' /></div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {menu && menu.map((menu,index) => (
                    <div className='flex justify-center items-center mt-4 transform transition-all duration-300 rounded-lg hover:scale-105'>
                    <Link key={menu.id} to={menu.link}>
                    <img
                      className="object-cover rounded-lg mt-4 h-48"
                      src={`/upload/HomepageMenu_Bilder/${menu.img}`}
                      alt="image description" />
                    </Link>
                    </div>
                  ))}
              </div>
        </div>

        <div className='p-6'>
        <p className='flex justify-center font-bold text-3xl'>En stolt fotballklubb</p>
        <div className='flex justify-center mt-3'><div className='h-1 w-64 bg-black rounded-full' /></div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
          <div className='flex justify-center items-center'>
            <img src={stoltklubb} className='rounded-3xl' alt ="" />
          </div>
          <div>
            {progressBars && progressBars.map((bar, index) => (
              <ProgressBar
                key={index}
                name={bar.name}
                progress={bar.progress}
                maxProgress={bar.maxProgress}
                logo={bar.logo}
              />
            ))}
          </div>
        </div>
        </div>


        {/* <div className="grid grid-cols-10 gap-4">
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

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">

                <div className="col-span-2">

                  <div className="relative w-12/14 mx-auto p-4 text-white rounded-xl justify-center mt-3 bg-blue-500 hover:bg-blue-900">
                    <Link to="https://www.facebook.com/iltrondfotball" className='pointer'><p className="text-lg justify-center flex items-center">Følg oss på Facebook</p></Link>
                  </div>
                </div>

                <div className="col-span-2">

                  <h1 className="text-xl font-bold justify-center flex items-center">Nyttig Informasjon</h1>
                </div>

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
        </div> */}
        </>
      

    )
}

export default Home