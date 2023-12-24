import axios from 'axios';
import React from 'react';
import Logo from '../../img/Rosenborgbanen.jpg'


const Personer = () => {

  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  


    return(
        <>
           <div className='flex flex-col md:grid grid-cols-4 gap-5'>
               <div className='md:col-span-4'>
                   <h1 className='flex items-center justify-center mt-14 font-bold capitalize text-3xl md:text-4xl'>Personer i klubben</h1>
                   <div className='flex justify-center mt-3 mb-14'><div className='h-1 w-64 bg-black rounded-full' /></div>
               </div>
               <div className='md:col-span-4'>
                   <h1 className='flex px-10 mt-6 mb-6 font-bold capitalize text-3xl md:text-4xl'>Gruppe Navn</h1>
                   {/* <div className='flex px-10 mt-3 mb-14'><div className='h-1 w-32 bg-black rounded-full' /></div> */}
               </div>
               <div className='flex justify-center items-center grid-span-2 md:col-span-1'>
                   <div className='w-64 h-auto bg-gray-200 rounded-3xl'>
                        <div className='flex justify-center mt-3 mb-4'><img className="w-32 h-32 rounded-full object-cover" src={Logo} alt="" /></div>
                        <h1 className='flex justify-center font-bold text-lg'>Person Navn</h1>
                        <h1 className='flex justify-center italic text-lg'>Person Stilling</h1>
                        <h1 className='flex justify-center text-sm mt-2'>Person E-post</h1>
                        <h1 className='flex justify-center text-sm mb-3'>Person Telefon</h1>
                   </div>
               </div>
               
               
           </div>
        </>
    )
}

export default Personer