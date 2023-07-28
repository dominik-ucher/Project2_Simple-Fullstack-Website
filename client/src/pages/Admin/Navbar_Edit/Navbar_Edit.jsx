import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
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
  const [editedLinks, setEditedLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/navbar/`, { withCredentials: true });
        setLinks(res.data);
        // Initialize editedLinks with the same data as links initially
        setEditedLinks([...res.data]);
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
      // Update the link in the MySQL database
      await axios.put(`http://localhost:8800/api/navbar/${links[index].id}`, {
        name: editedLinks[index].name,
        link: editedLinks[index].link,
      }, { withCredentials: true });

      // Update the original links state with the edited data
      const updatedLinks = [...links];
      updatedLinks[index].name = editedLinks[index].name;
      updatedLinks[index].link = editedLinks[index].link;
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
      await axios.delete(`http://localhost:8800/api/navbar/${links[index].id}`, { withCredentials: true });

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

  const handleAddLink = async () => {
    try {
      const newLink = { name: "", link: "" }; // You can set default values here if needed
      const res = await axios.post('http://localhost:8800/api/navbar/', newLink, { withCredentials: true });

      // After successful creation, update the state with the new link from the response
      setLinks((prevLinks) => [...prevLinks, res.data]);
      setEditedLinks((prevLinks) => [...prevLinks, { ...res.data, editing: true }]);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Redigere Navbar</h1>

      <table className="table-auto mt-4 mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Link</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {editedLinks.map((link, index) => (
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
                    Save
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
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

      <button
        className="px-2 py-1 bg-green-500 text-white rounded-md mt-4"
        onClick={handleAddLink}
      >
        Add New Link
      </button>
    </>
  );
};

export default Navbar_Edit;
