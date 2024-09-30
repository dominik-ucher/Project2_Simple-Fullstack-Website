import React, { useEffect, useRef, useState } from 'react';
import Logo2 from '../../img/new_name.png'
import imgback from '../../img/imgtest2.png'
import { Spinner } from 'flowbite-react';
import '../style.css';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import animepic from '../../img/anime.gif'

export default function Home2() {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
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

    <div className='bg-black'>
          <Helmet>
            <title>RaindropCoding</title>
            <meta name="google-site-verification" content="00HFpe5Ha5Ha6bJGcVM7Lus8S_WAz-W7fG_eIhZF2D8" />
            <meta name="title" content="RaindropCoding" />
            <meta name="description" content="Vi styrker identitet og merkevare til bedrifter ved digital markedsføring, profilering og designs. Vi hjelper din bedrift med å skille seg ut i det digitale landskapet." />
            <meta name="keywords" content="Raindrop Coding, RaindropCoding, digital, markedsføring, digitalmarkedsføring, nettside, kjøpe nettside" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          </Helmet>
        {/* First Section */}
        <FadeIn>
          <div className='relative flex items-center justify-center h-80 md:h-screen' style={{ backgroundImage: `url(${imgback})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className='absolute inset-0 bg-black opacity-50'></div> {/* Overlay with transparency */}
            <div className='relative text-center'>
              <FadeIn delay={300}>
                <h1 className='text-4xl md:text-8xl font-bold tracking-tighter text-white'>
                  Velkommen til
                </h1>
                <h1 className='text-4xl md:text-8xl font-bold tracking-tighter text-white'>
                  Raindrop Coding
                </h1>
              </FadeIn>
              <FadeIn delay={400}>
                <h2 className='pt-3 md:pt-5 text-sm md:text-2xl font-normal leading-relaxed text-orange-400'>
                  Hvor ideer kommer til virkeligheten på nettet!
                </h2>
                <div className='w-32 h-1 rounded-full bg-white mt-3 md:mt-5 inline-block' />
              </FadeIn>
            </div>
          </div>
        </FadeIn>

        {/* Second Section */}
        <div className='flex flex-col items-center justify-center h-auto p-10 bg-gray-900'>
            <img className='md:h-48 mb-6' src={Logo2} alt='Company Logo' />
            <h2 className='sm:text-5xl text-3xl font-medium title-font text-white mb-4 text-center'>
                Vi styrker <span className='underline'>identitet</span> og <span className='underline'>merkevare</span> til bedrifter ved digital markedsføring, profilering og designs
            </h2>
            <p className='text-lg text-gray-400 text-center pb-10'>
                Vi hjelper din bedrift med å skille seg ut i det digitale landskapet.
            </p>
            <Link to="/contact">
            <button className='bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105'>
                Ta Kontakt!
            </button>
            </Link>
        </div>



        {/* Third Section */}
        <div className='bg-blue-50'>
        <div className='w-full text-center pt-10 pb-10'>
            <h2 className='sm:text-5xl text-3xl font-medium title-font text-gray-900 mb-4'>Om Oss</h2>
            <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto mb-8'></div>
            <div className='flex flex-wrap items-center justify-center text-gray-700'>
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden p-4">
                <LazyLoadImage alt="raindropcoding website design" className="object-cover object-center h-auto w-full rounded-lg" src={animepic} />
                {/* <LazyLoadImage alt="raindropcoding website design" className="object-cover object-center h-auto w-full rounded-lg shadow-lg" src={team_coding} /> */}
            </div>

            <div className="lg:w-1/2 w-full px-6 py-6">
                <div className="flex flex-col lg:py-6 lg:pl-12 lg:text-left text-center">
                <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div className="flex-grow">
                    <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Digital Markedsføring</h2>
                    <p className="leading-relaxed text-lg">
                        Våre tjenester innen digital markedsføring er utformet for å hjelpe deg med å nå din målgruppe og øke din bedrifts vekst. Vi tilbyr et bredt spekter av tjenester, inkludert søkemotoroptimalisering (SEO), markedsføring på sosiale medier, e-postmarkedsføring og mer.
                    </p>
                    </div>
                </div>

                <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div className="flex-grow">
                    <h2 className="text-gray-900 text-2xl title-font font-medium mb-3">Nettside Utvikling</h2>
                    <p className="leading-relaxed text-lg">
                        Vi spesialiserer oss på å lage skreddersydde nettsidedesign som er tilpasset dine forretningsbehov. Vårt team av designere vil samarbeide med deg for å skape en nettside som både er visuelt tiltalende og brukervennlig. Vi bruker de nyeste designtrendene og teknologiene for å sikre at nettsiden din er oppdatert og møter kundenes behov.
                    </p>
                    </div>
                </div>

                {/* Add more sections as needed */}
                </div>
            </div>
            </div>
        </div>
        </div>



        {/* Sixth Section */}
        <div className='flex flex-wrap items-center justify-center p-20 bg-black text-gray-500'>
      <Helmet>
        <title>Contact | RaindropCoding</title>
        <meta name="title" content="Contact | RaindropCoding" />
        <meta name="description" content="Let us know what you are thinking about, and contact us!" />
        <meta name="keywords" content="Raindrop, RaindropCoding, Coding, Digital, Marketing, Website" />
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

      </div>
  );
}
