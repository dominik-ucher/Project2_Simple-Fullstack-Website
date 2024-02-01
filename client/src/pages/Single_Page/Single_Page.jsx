import React, { useEffect, useState } from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom"
import  Sidebar  from '../../components/Sidebar/Sidebar.jsx'
import { Button, Card } from 'flowbite-react';
import axios from 'axios';
import moment from 'moment'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext'
import DOMPurify from "dompurify";
import './Single_Page.css'
import { CiWarning } from "react-icons/ci";

const Single_Page = () => {

  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [side, setSide] = useState({});
  const [files, setFiles] = useState([]);
  const [openModula, setOpenModula] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const sideId = location.pathname.split("/")[2].split("_")[0];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/sider/${sideId}`, { withCredentials: true });
        setSide(res.data);

        // Fetch associated files for the side
        const filesRes = await axiosInstance.get(`/api/siderfiler/${sideId}`, { withCredentials: true });
        setFiles(filesRes.data); // Assuming the response contains an array of files
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [sideId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/sider/${sideId}`,{withCredentials: true,});
        setSide(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [sideId]);

  const handleDelete = async ()=>{
    try {
      await axiosInstance.delete(`/api/sider/${sideId}`,{withCredentials: true,});
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
        // <div className="grid grid-cols-10 gap-4">
        <div className="bg-white-200 px-6 md:px-48">
        <div className='single'>
            <div className='content'>
                <h1 className='flex items-center justify-center mt-14 mb-14 font-bold capitalize text-3xl md:text-5xl'>{side.title}</h1>
                <img 
                className='rounded-3xl '
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
                    <img onClick={() => setOpenModula(true)} className="w-10 h-10 cursor-pointer" src={deleteicon} alt="" />

                    {/* Modula */}
                    {openModula && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
                        <div className="bg-white w-auto h-auto p-8 rounded-lg">
                          {/* Add your modal content here */}
                          <div className='flex flex-col justify-center items-center'>
                          <CiWarning className='w-32 h-auto' color='red'/>
                          <h1 className='text-lg font-bold'>Er du sikker på du vil slette denne Siden?</h1>
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
            <div className="text-black flex flex-col mt-10 px-10 my-special-content">
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(side.desc).replace(/<a/g, '<a class="text-blue-500 underline"') }}></p>
            </div>

        </div>
        {/* Display uploaded files */}
        <div>
        {files && files.length > 0 && (
          <h1 className='underline font-bold text-xl px-10 mt-16'>Vedlegg</h1>
        )}

        {files && files.map((file) => {
          // Split the file name by '__' and take the second part
          const fileNameParts = file.filnavn.split('__');
          const displayedFileName = fileNameParts.length > 1 ? fileNameParts[1] : file.filnavn;

          return (
            <a
              key={file.id} // Assuming file.id exists
              className='text-black flex items-center mt-2 px-10 underline'
              href={`/upload/Sider/Sider_Filer/${file.filnavn}`} // Update with correct file URL
              target="_blank"
              rel="noopener noreferrer"
            >
              {displayedFileName} {/* Display the part after '__' in the file name */}
            </a>
          );
        })}
      </div>
        </div>
    )
}

export default Single_Page