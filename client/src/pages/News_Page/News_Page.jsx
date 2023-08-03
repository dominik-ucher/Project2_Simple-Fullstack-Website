import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Pagination } from 'flowbite-react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const News_Page = () => {
  const [nyheter, setNyheter] = useState([]);
  const [mainpic, setMainpic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/nyheter/');
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
        const res = await axios.get('http://localhost:8800/api/homepagepic/');
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
      <img
        className="object-cover h-auto w-full"
        key={mainpic.id}
        src={`../upload/Homepage_Bilder/${mainpic.img}`}
        alt="image description"
      />
      <div className="relative w-12/14 mx-auto p-4 bg-gray-800 text-white rounded-xl justify-center mt-3">
        <p className="text-lg justify-center flex items-center">Velkommen til Idrettslaget Trond</p>
        <p className="text-ls mt-2 justify-center flex items-center">Artig-Inkluderende-Utviklende</p>
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-7 bg-white-200 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nyheter.slice(startIndex, endIndex).map((nyhet, index) => (
              <Link to={`/nyheter/${nyhet.id}`} key={nyhet.id}>
                <div>
                  <Card className="max-w-sm mt-10" href="#">
                    <img
                      className="object-cover h-48 w-96"
                      src={`../upload/Nyheter/Nyheter_Bilder/${nyhet.img}`}
                      alt=""
                    />
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p className='line-clamp-3'>{nyhet.title}</p>
                    </h5>
                    <p
                      className="line-clamp-3 font-normal text-gray-700 dark:text-gray-400"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nyhet.desc) }}
                    ></p>
                    <Button gradientDuoTone='redToYellow' outline className="flex"><h2>Les mer</h2></Button>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
          <Pagination
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              totalPages={Math.ceil(nyheter.length / itemsPerPage)}
              className='flex justify-center mt-10'
            />
        </div>
        <div className="col-span-10 md:col-span-3 bg-white-300">
          {/* Include your Sidebar component here */}
        </div>
      </div>
    </>
  );
}

export default News_Page;
