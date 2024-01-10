import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
'use client';
import { Button, Label, TextInput } from 'flowbite-react';

const Checkout = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const customerId = location.pathname.split("/")[2].split("_")[0];
  const [customerinfo, setCustomerinfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/payment_sql/${customerId}`,{withCredentials: true,});
        setCustomerinfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [customerId]);



  return (
    <div className="flex justify-center items-center h-auto mt-10">
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <div className='flex flex-col'>
            <h1 className='text-center text-3xl font-bold mb-6'>Du har fått en ny faktura fra</h1>
            <h1 className='text-center text-3xl font-bold mb-6'>Idrettslaget Trond</h1>
        </div>
        <div className='flex flex-col items-start'>
            <p className='text-center text-lg'>Navn:</p>
            <p className='text-center text-lg mb-6'>{customerinfo.fornavn} {customerinfo.etternavn}</p>
            <p className='text-center text-lg'>E-post:</p>
            <p className='text-center text-lg mb-6'>{customerinfo.epost}</p>
            <p className='text-center text-lg'>Telefon:</p>
            <p className='text-center text-lg mb-6'>{customerinfo.telefon}</p>
            <p className='text-center text-lg'>Vare:</p>
            <p className='text-center text-lg mb-6'>{customerinfo.vare}</p>
            <p className='text-center text-lg'>Pris:</p>
            <p className='text-center text-lg mb-6'>kr {customerinfo.pris},-</p>
            <p className='text-center text-lg'>Forfallsdato:</p>
            <p className='text-center text-lg mb-6'> {new Date(customerinfo.forfallsdato).toLocaleDateString('nb-NO')}</p>
            <p className='text-center text-lg'>Beskrivelse</p>
            <p className='text-center text-lg mb-6'>{customerinfo.beskrivelse}</p>
            <Button color='dark'>Betal nå</Button>
            <p className='text-center italic text-sm mb-6 mt-4'>Ved å betalt aksepterer du vilkår og betingelsene</p>
        </div>

      </div>
    </div>
  )
}

export default Checkout;
