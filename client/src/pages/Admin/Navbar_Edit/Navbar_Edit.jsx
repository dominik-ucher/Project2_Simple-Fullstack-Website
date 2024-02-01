import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Navbar_Edit = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  const [links, setLinks] = useState([]);
  const [editedLinks, setEditedLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/navbar/`, { withCredentials: true });
        setLinks(res.data);
        // Initialize editedLinks with the same data as links initially
        setEditedLinks(res.data && res.data.map((link) => ({ ...link, editing: false })));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (index) => {
    // Handle edit by toggling the editing state for the specified row
    const updatedEditedLinks = [...editedLinks];
    updatedEditedLinks[index].editing = !updatedEditedLinks[index].editing;
    setEditedLinks(updatedEditedLinks);
  };

  const handleSave = async (index) => {
    try {
      const linkToSave = editedLinks[index];

      if (linkToSave.id) {
        // If it's an existing link, update it in the MySQL database
        await axiosInstance.put(`/api/navbar/${linkToSave.id}`, {
          name: linkToSave.name,
          link: linkToSave.link,
        }, { withCredentials: true });
      } else {
        // If it's a new link, create it in the MySQL database
        const res = await axiosInstance.post('/api/navbar/', linkToSave, { withCredentials: true });
        linkToSave.id = res.data.id;
      }

      // Update the original links state with the edited data
      const updatedLinks = [...links];
      updatedLinks[index] = { ...linkToSave };
      setLinks(updatedLinks);

      // Set the editing state back to false
      const updatedEditedLinks = [...editedLinks];
      updatedEditedLinks[index].editing = false;
      setEditedLinks(updatedEditedLinks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (index) => {
    try {
      // Delete the link from the MySQL database
      const linkToDelete = editedLinks[index];

      if (linkToDelete.id) {
        await axiosInstance.delete(`/api/navbar/${linkToDelete.id}`, { withCredentials: true });
      }

      // Remove the link from the original links state
      const updatedLinks = [...links];
      updatedLinks.splice(index, 1);
      setLinks(updatedLinks);

      const updatedEditedLinks = [...editedLinks];
      updatedEditedLinks.splice(index, 1);
      setEditedLinks(updatedEditedLinks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddLink = () => {
    // Create a new empty link for editing
    const newLink = { name: "", link: "", editing: true };
    setEditedLinks((prevLinks) => [...prevLinks, newLink]);
  };

  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Redigere Navbar</h1>

      <table className="table-auto mt-4 mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Navn</th>
            <th className="px-4 py-2">Link</th>
            <th className="px-4 py-2">Handling</th>
          </tr>
        </thead>
        <tbody>
          {editedLinks && editedLinks.map((link, index) => (
            <tr key={link.id}>
              <td className="border px-4 py-2">
                {link.editing ? (
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => {
                      const updatedEditedLinks = [...editedLinks];
                      updatedEditedLinks[index].name = e.target.value;
                      setEditedLinks(updatedEditedLinks);
                    }}
                  />
                ) : (
                  link.name
                )}
              </td>
              <td className="border px-4 py-2">
                {link.editing ? (
                  <input
                    type="text"
                    value={link.link}
                    onChange={(e) => {
                      const updatedEditedLinks = [...editedLinks];
                      updatedEditedLinks[index].link = e.target.value;
                      setEditedLinks(updatedEditedLinks);
                    }}
                  />
                ) : (
                  link.link
                )}
              </td>
              <td className="border px-4 py-2">
                {link.editing ? (
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded-md mr-2"
                    onClick={() => handleSave(index)}
                  >
                    Lagre
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Rediger
                  </button>
                )}
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(index)}
                >
                  Slett
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center mt-10'>
      <Button
        color="dark"
        size="xl"
        onClick={handleAddLink}
      >
        Legg til ny lenke
      </Button>
      </div>
    </>
  );
};

export default Navbar_Edit;
