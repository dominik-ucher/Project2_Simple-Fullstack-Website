import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Button, FileInput, Label } from 'flowbite-react';

const Homepage_Pic = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  const [homepagepic, setHomepagepic] = useState({});

  useEffect(() => {
    axiosInstance.get('/api/homepagepic', { withCredentials: true })
      .then(response => setHomepagepic(response.data[0] || { id: null, img: '' }))
      .catch(error => console.error(error));
  }, []);

  const handleClick = async () => {
    const input = document.getElementById('file');
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      // Delete the old image
      if (homepagepic.img && homepagepic.id) {
        await axiosInstance.delete(`/api/homepagepic/${homepagepic.id}`, { withCredentials: true });
      }
  
      // Upload the new image
      const response = await axiosInstance.post(
        '/api/upload_homepagepicbilde',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const newImageFilename = response.data;
  
      // Add a new picture record to the database using POST request
      await axiosInstance.post(
        '/api/homepagepic',
        { img: newImageFilename },
        { withCredentials: true }
      );
  
      setHomepagepic({ ...homepagepic, img: newImageFilename });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mt-5'>Homepage Bilde</h1>

      <h2 className='font-bold text-3xl mt-5 mb-5'>Oppdatere Bilde</h2>

      {/* Display the current homepage picture */}
      {homepagepic.img && (
        <img
          className="object-cover h-48 w-96"
          src={`../upload/Homepage_Bilder/${homepagepic.img}`}
          alt="Current Homepage"
        />
      )}

      <div className="max-w mt-5 flex items-center justify-center space-x-4" id="updatePic">
        {/* File input for uploading a new picture */}
        <div className="max-w-md mt-5" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Last opp ny bilde" />
          </div>
          <FileInput id="file"/>
          <Button className="mt-12" color="dark" onClick={handleClick}>
            Oppdater
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage_Pic;
