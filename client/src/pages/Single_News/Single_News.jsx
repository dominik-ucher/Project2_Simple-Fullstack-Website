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
import { CiWarning } from "react-icons/ci";

const Single_News = () => {

  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [nyhet, setNyhet] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const nyhetId = location.pathname.split("/")[2].split("_")[0];
  const { currentUser } = useContext(AuthContext);
  const [nyheter, setNyheter] = useState([])
  const [files, setFiles] = useState([]);
  const [openModula, setOpenModula] = useState(false);

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
        // Fetch associated files for the side
        const filesRes = await axiosInstance.get(`/api/nyheterfiler/${nyhetId}`, { withCredentials: true });
        setFiles(filesRes.data);
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
                    <img onClick={() => setOpenModula(true)} className="w-10 h-10 cursor-pointer" src={deleteicon} alt="" />
                    
                    {/* Modula */}
                    {openModula && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
                        <div className="bg-white w-auto h-auto p-8 rounded-lg">
                          {/* Add your modal content here */}
                          <div className='flex flex-col justify-center items-center'>
                          <CiWarning className='w-32 h-auto' color='red'/>
                          <h1 className='text-lg font-bold'>Er du sikker på du vil slette denne Nyheten?</h1>
                          </div>
                          {/* Close button */}
                          <div className='flex gap-5 mt-5 justify-center'>
                            <Button color="failure" onClick={handleDelete}>
                              Slett
                            </Button>
                            <Button color="dark" onClick={() => setOpenModula(false)}>
                              Avbryt
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    </>
                    )}
                </div>
            </div>
            <div className="text-black flex flex-col mt-10 my-special-content">
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nyhet.desc).replace(/<a/g, '<a class="text-blue-500 underline"') }}></p>
            </div>
            
            {/* Display uploaded files */}
            <div>
            {files && files.length > 0 && (
              <h1 className='underline font-bold text-xl mt-16'>Vedlegg</h1>
            )}

            {files && files.map((file) => {
              // Split the file name by '__' and take the second part
              const fileNameParts = file.filnavn.split('__');
              const displayedFileName = fileNameParts.length > 1 ? fileNameParts[1] : file.filnavn;

              return (
                <a
                  key={file.id} // Assuming file.id exists
                  className='text-black flex items-center mt-2 underline'
                  href={`/upload/Nyheter/Nyheter_Filer/${file.filnavn}`} // Update with correct file URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {displayedFileName} {/* Display the part after '__' in the file name */}
                </a>
              );
            })}
          </div>
        </div>
        </div>
        <div className="col-span-10 md:col-span-3 bg-white-200">
          <h1 className='text-2xl flex justify-center font-bold mt-6'>Andre Nyheter</h1>
          {nyheter && nyheter.slice(1,5).map((nyhet, index) => (
              <div className="flex flex-col items-center text-lg text-black font-bold hover:text-yellow-300 p-6">
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
              </div>
            ))}
        </div>
        </div>
    )
}

export default Single_News