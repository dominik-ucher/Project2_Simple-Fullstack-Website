import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Card, Button } from 'flowbite-react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Homepage_Menu = () => {
  const { currentUser } = useContext(AuthContext);
  const [pics, setPics] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1); // Initialize to -1
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/homepage_menu');
      setPics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (index, value) => {
    setEditingIndex(index);
    const updatedPics = [...pics];
    updatedPics[index].link = value;
    setPics(updatedPics);
  };

  const handleSave = async (index) => {
    try {
      const { id, img, link } = pics[index];
      await axios.put(
        `/api/homepage_menu/${id}`,
        { img, link },
        { withCredentials: true }
      );
      setEditingIndex(-1); // Done editing, reset the editingIndex state
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (index) => {
    try {
      const picId = pics[index].id;
      await axios.delete(
        `/api/homepage_menu/${picId}`,
        { withCredentials: true }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      const newPic = { img: '', link: '' };
      await axios.post(
        '/api/homepage_menu',
        newPic,
        { withCredentials: true }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = async (acceptedFiles, index) => {
    try {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(
        '/api/upload_homepagemenubilde',
        formData,
        { withCredentials: true }
      );

      const updatedPics = [...pics];
      updatedPics[index].img = res.data;
      setPics(updatedPics);
    } catch (err) {
      console.log(err);
    }
  };

  // Move the Dropzone component here
  const Dropzone = ({ onDrop, index }) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, index),
    });

    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
      </div>
    );
  };

  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Homepage Menu</h1>
      <table className="table-auto mt-4 mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Link</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pics.map((pic, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <img src={`/upload/HomepageMenu_Bilder/${pic.img}`} alt={`Image ${index}`} className="w-16 h-16" />
                <Dropzone onDrop={onDrop} index={index} /> {/* Pass onDrop function and index to Dropzone component */}
              </td>
              <td className="border px-4 py-2">
                {editingIndex !== index ? (
                  <span>{pic.link}</span>
                ) : (
                  <input
                    type="text"
                    value={pic.link}
                    onChange={(e) => handleEdit(index, e.target.value)}
                  />
                )}
              </td>
              <td className="border px-4 py-2">
                {editingIndex !== index ? (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => setEditingIndex(index)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded-md mr-2"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                )}
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className="px-2 py-1 bg-green-500 text-white rounded-md mt-4"
        onClick={handleAdd}
      >
        Add New Row
      </Button>
    </>
  );
};

export default Homepage_Menu;
