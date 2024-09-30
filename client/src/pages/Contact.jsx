import axios from 'axios';
import { Button, TextInput, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Contact() {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !subject || !message) {
      setErrorMessage("Alle feltene må fylles ut.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post('/api/contact/send-email', {
        name: name,
        email: email,
        subject: subject,
        message: message,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setIsSent(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('An error occurred', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-wrap items-center justify-center p-20 bg-black text-gray-500'>
      <Helmet>
        <title>Kontakt Oss</title>
        <meta name="title" content="Kontakt Oss" />
        <meta name="description" content="Kom gjerne for en uforpliktende samtale over en kopp kaffe!" />
        <meta name="keywords" content="Raindrop Coding, RaindropCoding, digital, markedsføring, digitalmarkedsføring" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      </Helmet>

      <div className='w-full text-center mb-10'>
        <h2 className='sm:text-5xl text-3xl font-medium title-font text-white mb-4 pt-16'>Kontakt Oss</h2>
        <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto'></div>
        <h2 className='sm:text-4xl text-2xl font-md text-white pt-8 mb-4'>Kom gjerne for en uforpliktende samtale over en kopp kaffe!</h2>
      </div>
      <form className='gap-5 flex justify-center flex-col w-full max-w-lg' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Bedriftens Navn' 
          className='mt-4 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'  
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder='E-post' 
          className='mt-4 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder='Emne' 
          className='mt-4 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400' 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
        />
        <textarea 
          placeholder='Melding' 
          className='h-32 mt-4 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400' 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button 
          type="submit"
          className='mt-6 bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center' 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" light className="mr-2" />
              Sender...
            </>
          ) : (
            "Sende"
          )}
        </button>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        {isSent && (
          <div className="text-green-500 mt-4 bg-gray-800 p-4 rounded-lg">
            <strong>E-post er sendt!</strong> Vi tar kontakt med deg så snart som mulig.
          </div>
        )}
      </form>
    </div>
  );
}
