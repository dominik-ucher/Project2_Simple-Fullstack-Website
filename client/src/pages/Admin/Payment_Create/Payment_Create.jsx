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

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  return (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <h1 className='text-center mt-8 text-2xl font-bold'>Opprette Regning</h1>

        <div className='flex flex-col mt-8 space-y-4'>

          <div className='flex space-x-4'>
            <div className="flex flex-col">
              <Label htmlFor="input-gray" color="gray" value="Fornavn" />
              <TextInput id="input-gray" placeholder="Fornavn" required color="gray" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="input-gray" color="gray" value="Etternavn" />
              <TextInput id="input-gray" placeholder="Etternavn" required color="gray" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="input-blue" color="blue" value="E-post" />
              <TextInput id="input-blue" placeholder="E-post" required color="blue" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="input-blue" color="blue" value="Telefon" />
              <TextInput id="input-blue" placeholder="Telefon" required color="blue" />
            </div>
          </div>

          <div className='flex space-x-4'>
            <div className="flex flex-col">
              <Label htmlFor="input-blue" color="blue" value="Vare" />
              <Select id="countries" required>
                  <option>Klubbhus Utleie</option>
                  <option>Baneutleie</option>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="input-blue" color="blue" value="Forfalls Dato" />
              <DatePicker
                id="input-date"
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                placeholderText="Velg dato"
                dateFormat="dd.MM.yyyy"
                className="form-control rounded-xl border-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="input-blue" color="blue" value="Pris" />
              <TextInput id="input-blue" placeholder="Pris" required color="blue" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="input-blue" color="blue" value="Evt. Beskrivelse" />
              <TextInput id="input-blue" placeholder="Beskrivelse" required color="blue" />
            </div>
          </div>
          <Button color="dark" className="mt-6 w-full">Send Faktura</Button>
        </div>
      </div>
    </div>
  );
};

export default Payment_Create;
