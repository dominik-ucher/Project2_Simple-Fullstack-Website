import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Payment_Create = () => {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [newFaktura, setNewFaktura] = useState({
    fornavn: null,
    etternavn: null,
    epost: null,
    telefon: null,
    vare: '',
    forfallsdato: null,
    pris: null,
    beskrivelse: null,
    status: "Ubetalt",
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  const handleInputChange = (field, value) => {
    if (field === 'pris') {
      const parsedValue = parseInt(value, 10); // Convert pris to an integer
      setNewFaktura({ ...newFaktura, [field]: isNaN(parsedValue) ? null : parsedValue });
    } else if (field === 'forfallsdato') {
      const formattedDate = value ? new Date(value).toISOString().slice(0, 19).replace('T', ' ') : null; // Convert date to correct format
      setNewFaktura({ ...newFaktura, [field]: formattedDate });
    } else {
      setNewFaktura({ ...newFaktura, [field]: value });
    }
  };
  

  const handleClick = async () => {
    try {
      const response = await axiosInstance.post('/api/payment_sql/', newFaktura, {withCredential: true});
      console.log('Response from backend:', response.data);

    } catch (error) {
      console.error('Error occurred while uploading:', error);

    }
  };
  

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-center text-3xl font-bold mb-6'>Opprette Regning</h1>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <Label htmlFor='fornavn' color='gray' value='Fornavn' />
            <TextInput
              id='fornavn'
              placeholder='Fornavn'
              required
              color='gray'
              onChange={(e) => handleInputChange('fornavn', e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='etternavn' color='gray' value='Etternavn' />
            <TextInput
              id='etternavn'
              placeholder='Etternavn'
              required
              color='gray'
              onChange={(e) => handleInputChange('etternavn', e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='epost' color='blue' value='E-post' />
            <TextInput
              id='epost'
              placeholder='E-post'
              required
              color='blue'
              onChange={(e) => handleInputChange('epost', e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='telefon' color='blue' value='Telefon' />
            <TextInput
              id='telefon'
              placeholder='Telefon'
              required
              color='blue'
              onChange={(e) => handleInputChange('telefon', e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='vare' color='blue' value='Vare' />
            <Select
              id='vare'
              required
              value={newFaktura.vare} 
              onChange={(e) => handleInputChange('vare', e.target.value)}
            >
              <option value=''>None</option> {/* Set a default empty option */}
              <option value='Klubbhus Utleie'>Klubbhus Utleie</option>
              <option value='Baneutleie'>Baneutleie</option>
            </Select>
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='forfallsdato' color='blue' value='Forfalls Dato' />
            <DatePicker
              id='forfallsdato'
              selected={newFaktura.forfallsdato ? new Date(newFaktura.forfallsdato) : null}
              onChange={(date) => handleInputChange('forfallsdato', date)}
              placeholderText='Velg dato'
              dateFormat='dd.MM.yyyy'
              className='form-control rounded-xl border-gray-200'
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='pris' color='blue' value='Pris' />
            <TextInput
              id='pris'
              placeholder='Pris'
              required
              color='blue'
              onChange={(e) => handleInputChange('pris', e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='beskrivelse' color='blue' value='Evt. Beskrivelse' />
            <TextInput
              id='beskrivelse'
              placeholder='Beskrivelse'
              required
              color='blue'
              onChange={(e) => handleInputChange('beskrivelse', e.target.value)}
            />
          </div>
        </div>
        <Button color='dark' className='mt-6 w-full' onClick={handleClick}>
          Send Faktura
        </Button>
      </div>
    </div>
  );
};

export default Payment_Create;
