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

const Single_News = () => {


  const [nyhet, setNyhet] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const nyhetId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/nyheter/${nyhetId}`,{withCredentials: true,});
        setNyhet(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [nyhetId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`http://localhost:8800/api/nyheter/${nyhetId}`,{withCredentials: true,});
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];


    return(
        <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-7 bg-white-200">
        <div className='single'>
            <div className='content'>
                <img 
                className='w-100 h-auto mt-4 px-4'
                src={nyhet.img && `http://localhost:5173/upload/Nyheter/Nyheter_Bilder/${nyhet.img}`} 
                alt="" 
                />
            </div>
            <div className='user'>
                <div className='edit flex items-center mt-4 px-4'>
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
            <h1 className='flex items-center justify-center mt-20 font-bold capitalize text-3xl'>{nyhet.title}</h1>
            <p className='text-black flex items-center justify-center mt-10 px-10' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(nyhet.desc),}}></p>
        </div>
        </div>
        <div className="col-span-10 md:col-span-3 bg-white-200">
                {posts.map((posts,index) => (
                <Link to="">
                <div key={posts.id}>
                <Card className="max-w-sm mt-10" href="#">
                <img className="object-cover h-48 w-96" src={posts.img} alt="" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p className='line-clamp-3'>{posts.title}</p>
                </h5>
                <p className="line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
                <p>{posts.desc}</p>
                </p>
                </Card>
                </div>
                </Link>
            ))}
        </div>
        </div>
    )
}

export default Single_News