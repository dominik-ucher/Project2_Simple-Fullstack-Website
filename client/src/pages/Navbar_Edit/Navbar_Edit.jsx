import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Navbar_Edit = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/navbar/`);
        setLinks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Redigere Navbar</h1>
      
      {links.map((links, index) => (
        <div key={links.id}>
          <h1>{links.name}</h1>
          <h1>{links.link}</h1>
          <h1>Done</h1>
        </div>
      ))}
    </>
  );
};

export default Navbar_Edit;
