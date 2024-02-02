import React, { useState } from 'react';
import { Label, TextInput, Select, Textarea, Button, Spinner } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import Logo from '../../img/logo.png';
import axios from 'axios';

const Contact = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    selectedOption: 'leder@trondfotball.no',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axiosInstance.post('/api/contact/send-email', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Handle success
        setIsSent(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          selectedOption: 'leder@trondfotball.no',
          message: '',
        });
        setIsLoading(false);
      } else {
        // Handle failure
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className="grid grid-cols-10 gap-4 md:px-20">
      <div className="col-span-10 md:col-span-5 mt-20">
        <h1 className="underline decoration-2 text-center font-bold text-4xl mt-5">Kontakt Oss</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2 block px-4 mt-20">
            <Label htmlFor="name" value="Navn" />
          </div>
          <TextInput
            className="px-4"
            id="name"
            name="name"
            sizing="md"
            type="text"
            placeholder="Navn"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <div className="mt-4 px-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="E-post" />
            </div>
            <TextInput
              icon={HiMail}
              id="email"
              name="email"
              placeholder="navn@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              type="email"
            />
          </div>

          <div className="mb-2 block mt-4 px-4">
            <Label htmlFor="subject" value="Emne" />
          <TextInput
            id="subject"
            name="subject"
            sizing="md"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
          />
          </div>

          <div className="mt-4 px-4" id="select">
            <div className="mb-2 block">
              <Label htmlFor="selectedOption" value="Velg kontakt punkt" />
            </div>
            <Select
              id="selectedOption"
              name="selectedOption"
              value={formData.selectedOption}
              onChange={handleInputChange}
              required
            >
              <option value="leder@trondfotball.no">Leder</option>
              <option value="styreleder@trondfotball.no">Styreleder</option>
              <option value="su@trondfotball.no">Sportslig Leder</option>
              <option value="drift@trondfotball.no">Drift</option>
              <option value="arew@trondfotball.no">Kasserer</option>
            </Select>
          </div>

          <div className="mt-4 px-4" id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="message" value="Din Melding" />
            </div>
            <Textarea
              id="message"
              name="message"
              placeholder="Melding..."
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>

          <div className="px-4 mt-4">
          <Button pill size="lg" color="dark" onClick={handleSubmit} disabled={isLoading}>{isLoading ? (<Spinner aria-label="Spinner button example" />) : ('Send' )}</Button>
            {isSent && (
              <div className="text-green-500">Email Sent</div>
            )}
          </div>
        </form>
      </div>
      <div className="col-span-10 md:col-span-5 mt-20">
            <h1 className='font-bold text-xl mt-4 px-4'>Besøksadresse:</h1>
            <h2 className='text-base mt-4 px-4 underline'>Ibsens gate 8, 7015 Trondheim</h2>
            <h1 className='font-bold text-xl mt-4 px-4'>Postadresse:</h1>
            <h2 className='text-base mt-4 px-4 underline'>Postboks 9026 Rosenborg</h2>
            <h2 className='text-base px-4 underline'>7455 Rosenborg</h2>
            <h1 className='font-bold text-xl mt-4 px-4'>Parkering</h1>
            <h2 className='text-base mt-4 px-4'>Rundt Rosenborgbanen er det soneparkering døgnet rundt. Det betyr stor fare for bøter dersom man stiller seg i gata. Ved enden av banen i sør er det både betalingsplasser og gratisplasser. Det finnes også noen parkeringsplasser utenfor klubbhuset som ikke er sonebelagt.</h2>
            <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Contact;
