import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Button, Label, TextInput } from 'flowbite-react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

const Payment_Create = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  return (
    <div className='h-auto flex justify-center items-center'>
      <div>
        <h1 className='text-center mt-8 text-2xl font-bold'>Opprette Regning</h1>

        <div className='flex flex-col w-48 mt-20'>
          <div className="mb-2 block">
            <Label htmlFor="input-gray" color="gray" value="Fornavn" />
          </div>
          <TextInput id="input-gray" placeholder="Fornavn" required color="gray" />

          <div className="mb-2 mt-4 block">
            <Label htmlFor="input-gray" color="gray" value="Etternavn" />
          </div>
          <TextInput id="input-gray" placeholder="Etternavn" required color="gray" />

          <div className="mb-2 mt-4 block">
            <Label htmlFor="input-blue" color="blue" value="E-post" />
          </div>
          <TextInput id="input-blue" placeholder="E-post" required color="blue" />

          <div className="mb-2 mt-4 block">
            <Label htmlFor="input-blue" color="blue" value="Telefon" />
          </div>
          <TextInput id="input-blue" placeholder="Telefon" required color="blue" />

          <div className="mb-2 mt-4 block">
            <Label htmlFor="input-blue" color="blue" value="Forfalls Dato" />
          </div>
          <DatePicker
            id="input-date"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            placeholderText="Velg dato"
            dateFormat="dd.MM.yyyy" // Customize date format if needed
            className="form-control rounded-xl border-gray-200" // You might need to adjust the class for styling
          />

          <div className="mb-2 mt-4 block">
            <Label htmlFor="input-blue" color="blue" value="Pris" />
          </div>
          <TextInput id="input-blue" placeholder="Pris" required color="blue" />

          <Button color="dark" className="mt-6">Send Faktura</Button>
          

        </div>
      </div>
    </div>
  );
};

export default Payment_Create;
