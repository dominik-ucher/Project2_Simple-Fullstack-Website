import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'

const User_Edit = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [editedUsers, setEditedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/api/users');
        setUsers(res.data);
        // Initialize editedUsers with the same data as users initially
        setEditedUsers([...res.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (index) => {
    // Handle edit by toggling the editing state for the specified row
    const updatedEditedUsers = [...editedUsers];
    updatedEditedUsers[index].editing = !updatedEditedUsers[index].editing;
    setEditedUsers(updatedEditedUsers);
  };

  const handleSave = async (index) => {
    try {
      // Update the user in the MySQL database
      await axiosInstance.put(`/api/users/${users[index].id}`, {
        username: editedUsers[index].username,
        email: editedUsers[index].email,
      }, { withCredentials: true });

      // Update the original users state with the edited data
      const updatedUsers = [...users];
      updatedUsers[index].username = editedUsers[index].username;
      updatedUsers[index].email = editedUsers[index].email;
      setUsers(updatedUsers);

      // Set the editing state back to false
      const updatedEditedUsers = [...editedUsers];
      updatedEditedUsers[index].editing = false;
      setEditedUsers(updatedEditedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/api/users/${userId}`, { withCredentials: true });

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>User Management</h1>

      <table className="table-auto mt-4 mx-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Brukernavn</th>
            <th className="px-4 py-2">E-post</th>
            <th className="px-4 py-2">Handling</th>
          </tr>
        </thead>
        <tbody>
          {editedUsers && editedUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                {user.editing ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => {
                      const updatedEditedUsers = [...editedUsers];
                      updatedEditedUsers[index].username = e.target.value;
                      setEditedUsers(updatedEditedUsers);
                    }}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border px-4 py-2">
                {user.editing ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => {
                      const updatedEditedUsers = [...editedUsers];
                      updatedEditedUsers[index].email = e.target.value;
                      setEditedUsers(updatedEditedUsers);
                    }}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border px-4 py-2">
                {user.editing ? (
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
                {/* Delete button */}
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Slett
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User_Edit;
