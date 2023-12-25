import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Personer = () => {
  const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });
  const [personer, setPersoner] = useState([]);
  const [grupper, setGrupper] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personerResponse, grupperResponse] = await Promise.all([
          axiosInstance.get('/api/person/'),
          axiosInstance.get('/api/person/gruppe')
        ]);
        setPersoner(personerResponse.data);
        setGrupper(grupperResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderPersonCard = person => (
    <div
      key={person.id}
      className="flex flex-col items-center justify-center border rounded-lg p-4 bg-white shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
        {person.img ? (
          <img className="w-full h-full object-cover" src={`/upload/Personer/${person.img}`} alt="" />
        ) : (
          <FaUserAlt className="w-32 h-32 text-gray-500" />
        )}
      </div>
      <h1 className="font-bold text-xl mt-4">{person.navn}</h1>
      <h1 className="italic text-lg">{person.stilling}</h1>
      <h1 className="text-sm mt-2"><a className="hover:underline" href={`mailto:${person.epost}`}>{person.epost}</a></h1>
      <h1 className="text-sm">{person.tlf}</h1>
    </div>
  );

  return (
    <div className="flex flex-col md:grid grid-cols-4 gap-8">
      <div className="md:col-span-4">
        <h1 className="flex items-center justify-center mt-14 font-bold capitalize text-3xl md:text-4xl">Personer i klubben</h1>
        <div className="flex justify-center mt-3 mb-14">
          <div className="h-1 w-64 bg-black rounded-full" />
        </div>
      </div>
      {grupper &&
        grupper.map(gruppe => (
          <div key={gruppe.id} className="md:col-span-4">
            <h1 className="flex px-6 mt-8 mb-6 font-bold capitalize text-3xl md:text-4xl">{gruppe.navn}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {personer &&
                personer
                  .filter(person => person.gruppe === gruppe.id)
                  .map(person => (
                    <div className="group" key={person.id}>
                      
                        {renderPersonCard(person)}
                    
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Personer;
