import React, { useEffect, useRef, useState } from 'react';
import Background from '../../img/background.jpg';
import Hosting from '../../img/Hosting.png';
import Domain from '../../img/Domain.png';
import Design from '../../img/Design.png';
import { Button, Card } from 'flowbite-react';
import '../style.css';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Link } from 'react-router-dom';
import axios from 'axios'
import team_coding from '../../img/team_coding.jpg'
import Idrettslaget_Trond from '../../img/Idrettslaget_Trond.png'
import raindrop from '../../img/raindrop.jpg'
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Home = () => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardData = [
    // Array containing your card data, each element represents a card
    // You can customize this array with your actual card data
    {
      title: 'Idrettslaget Trond',
      image: Idrettslaget_Trond,
      content: 'We had a goal to make a brand new and user-friendly website for Idrettslaget Trond. The website had new features and functions aswell as a payment gateway, so that they can send payments from the website aswell.',
      link: 'https://rosenborgbanen.no'
    },
    // ... More cards
  ];

  const maxIndex = Math.ceil(cardData.length / 3) - 1;

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < 3) { // Adjust this based on the number of cards
      setCurrentIndex(currentIndex + 1);
    }
  };

  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const [isSent, setIsSent] = useState(false);



  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
        // Handle success
        setIsSent(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        // Handle failure
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (

    <div className='bg-black'>
          <Helmet>
            <title>Home | RaindropCoding</title>
            <meta name="google-site-verification" content="00HFpe5Ha5Ha6bJGcVM7Lus8S_WAz-W7fG_eIhZF2D8" />
            <meta name="title" content="Home | RaindropCoding" />
            <meta name="description" content="RaindropCoding digital marketing services are designed to help you reach your target audience and grow your business. We specialize in creating custom website designs" />
            <meta name="keywords" content="Raindrop, RaindropCoding, Coding, Digital, Marketing, Website" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          </Helmet>
        {/* First Section */}
        <FadeIn>
          <div className='flex items-center justify-center h-80 bg-black md:h-screen' >
            <div className='text-center'>
              <FadeIn delay={300}>
                <h1 className='text-4xl md:text-8xl font-bold tracking-tighter text-white'>
                  Welcome to
                </h1>
                <h1 className='text-4xl md:text-8xl font-bold tracking-tighter text-white'>
                  Raindrop Coding
                </h1>
              </FadeIn>
              <FadeIn delay={400}>
                <h2 className='pt-3 md:pt-5 text-sm md:text-2xl font-normal leading-relaxed text-orange-400'>
                  Where Ideas Come to Life on the Web!
                </h2>
                <div className='w-32 h-1 rounded-full bg-white mt-3 md:mt-5 inline-block' />
              </FadeIn>
            </div>
          </div>
        </FadeIn>

        {/* Second Section */}
        {/* <div className='flex items-center justify-center bg-black'>
      <div className='container flex items-center justify-center mx-auto rounded-lg md:p-1'>
        <div className='flex justify-center items-center w-full md:w-2/3'>
          <img
            className='flex justify-center items-center object-center w-full md:h-96 md:w-auto mb-10 border-gray-200 dark:border-gray-900 border rounded-lg shadow-md'
            alt='hero'
            src={raindrop}
          />
        </div>
      </div>
    </div> */}

        {/* Third Section */}
        <div className='w-full text-center bg-black pt-10'>
          <h2 className='sm:text-5xl font-medium title-font text-white mb-4'>About Us</h2>
          <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto mb-4'></div>
        </div>
        <div className='flex flex-wrap items-center justify-center bg-black text-gray-500'>
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <LazyLoadImage alt="raindropcoding website design" className="object-cover object-center h-full w-full" src={team_coding} />
            {/* <img alt="feature" className="object-cover object-center h-full w-full" src={team_coding} /> */}
          </div>

          <div className="lg:w-1/2 px-6 py-6">
            <div className="flex flex-col lg:py-6 lg:pl-12 lg:text-left text-center">
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="flex-grow">
                  <h2 className="text-white text-2xl title-font font-medium mb-3">Digital Marketing</h2>
                  <p className="leading-relaxed text-lg">Our digital marketing services are designed to help you reach your target audience and grow your business. We offer a wide range of services, including search engine optimization (SEO), social media marketing, email marketing, and more. Our team of experts will work with you to create a customized marketing plan that meets your specific needs.</p>
                </div>
              </div>

              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="flex-grow">
                  <h2 className="text-white text-2xl title-font font-medium mb-3">Website Designs</h2>
                  <p className="leading-relaxed text-lg">We specialize in creating custom website designs that are tailored to your business needs. Our team of designers will work with you to create a website that is both visually appealing and user-friendly. We use the latest design trends and technologies to ensure that your website is up-to-date and meets the needs of your customers.</p>
                </div>
              </div>

              {/* Repeat the above "Free" section for other sections */}
            </div>
          </div>
        </div>

        {/* Fourth Section */}
        <div className='flex flex-col pt-10 bg-black text-gray-500'>
  <div className='w-full text-center'>
    <h2 className='sm:text-5xl font-medium title-font text-white mb-4'>Our Projects</h2>
    <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto'></div>
  </div>

  <div className='flex items-center'>
    <button onClick={scrollLeft} className={`px-4 py-2 bg-gray-800 text-white rounded-l ${currentIndex === 0 && 'hidden'}`}>
      &lt; {/* Left arrow */}
    </button>
    <div className='flex p-5 items-center' style={{ width: '100%', overflowX: 'hidden' }} ref={scrollContainerRef}>
      {/* Horizontal scrolling container */}
      {cardData && cardData.map((card, index) => (
        <div
          key={index}
          className={`w-full sm:w-1/3 mx-2`}
          style={{
            flexShrink: 0,
            display: currentIndex === Math.floor(index / 3) ? 'block' : 'none',
          }}
        >
          <Link to={card.link}>
            <Card className='w-full' imgAlt='' imgSrc={card.image}>
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {card.title}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                {card.content}
              </p>
            </Card>
          </Link>
        </div>
      ))}
    </div>
    <button onClick={scrollRight} className={`px-4 py-2 bg-gray-800 text-white rounded-r ${currentIndex === maxIndex && 'hidden'}`}>
      &gt; {/* Right arrow */}
    </button>
  </div>
</div>



        {/* Fifth Section */}
        <div className='flex flex-wrap items-center justify-center bg-black text-gray-500 pt-10'>
          <div className='w-full text-center'>
            <h2 className='sm:text-5xl font-medium title-font text-white mb-4'>What We Do</h2>
            <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto'></div>
          </div>

          <div className='grid grid-cols-3 gap-10 px-10 mt-10'>
            <div className='flex justify-center text-center md:col-span-1 col-span-3'>
              <div className="flex-grow">
                <img src={Hosting} alt="" className='rounded w-60 mx-auto' /> {/* Added mx-auto */}
                <h2 className="text-white text-2xl title-font font-medium mb-3 pt-10">Digital Marketing</h2>
                <div className='w-32 h-1 rounded-full bg-orange-400 mx-auto mt-5'></div>
                <p className="leading-relaxed text-lg mt-5">With our Digital Marketing service we can help increase your reach and popularity, aswell as grow your digital presence.</p>
              </div>
            </div>
            <div className='flex justify-center text-center md:col-span-1 col-span-3'>
              <div className="flex-grow">
                <img src={Design} alt="" className='rounded w-60 mx-auto' /> {/* Added mx-auto */}
                <h2 className="text-white text-2xl title-font font-medium mb-3 pt-10">Website Designs</h2>
                <div className='w-32 h-1 rounded-full bg-orange-400 mx-auto mt-5'></div>
                <p className="leading-relaxed text-lg mt-5">We specialize in website designs custom to your needs. We make user friendly and websites that are both appealing and easy to use.</p>
              </div>
            </div>
            <div className='flex justify-center text-center md:col-span-1 col-span-3'>
              <div className="flex-grow">
                <img src={Domain} alt="" className='rounded w-60 mx-auto' /> {/* Added mx-auto */}
                <h2 className="text-white text-2xl title-font font-medium mb-3 pt-10">Digital Management</h2>
                <div className='w-32 h-1 rounded-full bg-orange-400 mx-auto mt-5'></div>
                <p className="leading-relaxed text-lg mt-5"> We simplify the process of managing your website and other digital processes, by keeping an eye on everything for you! So that you can use your time more efficently.</p>
              </div>
            </div>
          </div>
        </div>


        {/* Sixth Section */}
        <div className='flex flex-wrap items-center justify-center p-20 bg-black text-gray-500'>
          <div className='w-full text-center'>
            <h2 className='sm:text-5xl font-medium title-font text-white mb-4'>Contact Us</h2>
            <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto'></div>
          </div>
          <form className='gap-5 flex justify-center flex-col w-48'>
            <input type="text" placeholder='Name' className='mt-10 bg-black border-b-2 border-t-0 border-x-0 border-white'  value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='email@email.com' className='mt-10 bg-black border-b-2 border-t-0 border-x-0 border-white' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='About' className='mt-10 bg-black border-b-2 border-t-0 border-x-0 border-white' value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea type="textarea" placeholder='Message' className='h-32 mt-10 bg-black border-b-2 border-t-0 border-x-0 border-white' value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button pill color="gray" className="mt-5" onClick={handleSubmit}>Send</Button>
            {isSent && (
              <div className="text-green-500">Email Sent</div>
            )}
          </form>
        </div>
      </div>
  );
};

export default Home;
