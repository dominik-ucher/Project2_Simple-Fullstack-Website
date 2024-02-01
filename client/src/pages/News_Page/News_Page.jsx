import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Pagination } from 'flowbite-react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import FadeIn from 'react-fade-in/lib/FadeIn';
import arrow from '../../img/arrow.png'

const News_Page = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [nyheter, setNyheter] = useState([]);
  const [mainpic, setMainpic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

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
        const res = await axiosInstance.get('/api/homepagepic/');
        setMainpic(res.data[0] || { id: null, img: '' });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
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
                <p className="text-xl md:text-4xl font-bold text-center">Nyheter</p>
                
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
        <div className='invisible md:visible h-1 w-screen rounded-full bg-gray-300 mt-2 px-12' />
      <div className="grid grid-cols-3 md:gap-4">
        <div className="col-span-3 bg-white-200">
          <div className="grid grid-cols-2 md:grid-cols-3">
          {nyheter && nyheter.slice(startIndex,endIndex).map((nyhet, index) => (
              <div className="flex flex-col items-center text-lg text-black font-bold hover:text-yellow-300 p-2 md:p-6">
                <Link key={nyhet.id} to={`/nyheter/${nyhet.id}_${nyhet.title}`}>
                <div className="relative overflow-hidden transform transition-all duration-300 rounded-lg hover:scale-105">
                <img
                  className="object-cover h-48 w-96 rounded-xl"
                  src={`../upload/Nyheter/Nyheter_Bilder/${nyhet.img}`}
                  alt=""
                />
                </div>
                <p className='line-clamp-3 p-2 flex justify-center'>{nyhet.title}</p>
                </Link>
                <div className='invisible md:visible h-1 w-96 rounded-full bg-gray-300 mt-4 px-12' />
              </div>
            ))}
          </div>
          <Pagination
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              totalPages={Math.ceil(nyheter.length / itemsPerPage)}
              className='flex justify-center mt-10'
            />
        </div>
      </div>
    </>
  );
}

export default News_Page;
