import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Card, Button, Label, TextInput, FileInput, Table, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";

const Homepage_Menu = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [persons, setPersons] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newPersonData, setNewPersonData] = useState({
    img: '',
    navn: '',
    stilling: '',
    epost: '',
    tlf: '',
    gruppe: '', // Assuming gruppe is a group ID
  });
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchPersons();
    fetchGroups();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axiosInstance.get('/api/person');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axiosInstance.get('/api/person/gruppe');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const deleteGroupHandler = async (id) => {
    try {
      await axiosInstance.delete(`/api/person/gruppe/${id}`);
      fetchGroups(); // Refresh groups after deletion
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const deletePersonHandler = async (id) => {
    try {
      await axiosInstance.delete(`/api/person/${id}`);
      fetchPersons(); // Refresh persons after deletion
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const addNewGroup = async () => {
    try {
      await axiosInstance.post('/api/person/gruppe', { gruppe: newGroupName });
      setNewGroupName(''); // Clear the input field after adding the group
      fetchGroups(); // Refresh groups after addition
    } catch (error) {
      console.error('Error adding new group:', error);
    }
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", newPersonData.img);
      const res = await axiosInstance.post("/api/upload_personbilde", formData);
      return res.data; 
    } catch (err) {
      console.log(err);
    }
  };
  

  const addNewPerson = async () => {
    let imgUrl = '';
  
    if (newPersonData.img) {
      imgUrl = await upload();
    }

    try {
      await axiosInstance.post('/api/person', {
        img: imgUrl,
        navn: newPersonData.navn,
        stilling: newPersonData.stilling,
        epost: newPersonData.epost,
        tlf: newPersonData.tlf,
        gruppe: parseInt(newPersonData.gruppe),
      });
  
      // Rest of the code remains unchanged
    } catch (error) {
      console.error('Error adding new person:', error);
    }
  };
  

  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Personer i klubben</h1>
      <h1 className='text-center mt-8 text-2xl font-bold'>Forskjellige Grupper</h1>
      <div className='flex justify-center'>
        <div>
            <div className="mb-2 mt-6 block">
            <Label htmlFor="base" value="Ny Gruppe" />
            </div>
            <TextInput id="base" type="text" sizing="md" placeholder='Gruppe Navn' value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)}/>
        </div>
        <div className='mt-14 px-4'>
            <Button color="dark" pill onClick={addNewGroup}>
                Legg til
            </Button>
        </div>
      </div>
      <div className="overflow-x-auto mt-6 w-auto flex justify-center">
        <Table striped>
            <Table.Head>
            <Table.HeadCell>Navn</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            {groups && groups.map((group) => (
                <Table.Row
                key={group.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {group.navn}
                </Table.Cell>
                <Table.Cell>
                    <Button
                    onClick={() => deleteGroupHandler(group.id)}
                    color="failure"
                    >
                    Delete
                    </Button>
                </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        </div>


      <h1 className='text-center mt-8 text-2xl font-bold'>Personer i Gruppene</h1>
      <div className='flex justify-center'>
        <div className='mt-6 black mb-2'>
            <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Bilde" />
            </div>
            <FileInput
            id="file-upload"
            onChange={(e) => setNewPersonData({ ...newPersonData, img: e.target.files[0] })}
            />
        </div>
        <div>
            <div className="mb-2 mt-6 block">
            <Label htmlFor="base" value="Navn" />
            </div>
            <TextInput
            id="name"
            type="text"
            sizing="md"
            placeholder='Navn'
            value={newPersonData.navn}
            onChange={(e) => setNewPersonData({ ...newPersonData, navn: e.target.value })}
            />
        </div>
        <div>
            <div className="mb-2 mt-6 block">
            <Label htmlFor="base" value="Stilling" />
            </div>
            <TextInput
            id="Stilling"
            type="text"
            sizing="md"
            placeholder='Stilling'
            value={newPersonData.stilling}
            onChange={(e) => setNewPersonData({ ...newPersonData, stilling: e.target.value })}
            />
        </div>
        <div>
            <div className="mb-2 mt-6 block">
            <Label htmlFor="base" value="E-post" />
            </div>
            <TextInput
            id="email"
            type="text"
            sizing="md"
            placeholder='E-post'
            value={newPersonData.epost}
            onChange={(e) => setNewPersonData({ ...newPersonData, epost: e.target.value })}
            />
        </div>
        <div>
            <div className="mb-2 mt-6 block">
            <Label htmlFor="base" value="Telefon" />
            </div>
            <TextInput
            id="phone"
            type="text"
            sizing="md"
            placeholder='Telefon'
            value={newPersonData.tlf}
            onChange={(e) => setNewPersonData({ ...newPersonData, tlf: e.target.value })}
            />
        </div>
        <div className="max-w-md">
        <div className="mt-6 mb-2 block">
            <Label htmlFor="countries" value="Velg en gruppe" />
        </div>
        <Select
        id="gruppe"
        required
        value={newPersonData.gruppe}
        onChange={(e) => setNewPersonData({ ...newPersonData, gruppe: e.target.value })}
        >
            <option value={null}>None</option>
            {groups && groups.map((group) => (
            <option key={group.id} value={group.id}>{group.navn}</option>
            ))}
        </Select>
        </div>
        <div className='mt-14 px-4'>
            <Button color="dark" pill onClick={addNewPerson}>
                Legg til
            </Button>
        </div>
      </div>
      <div className="overflow-x-auto mt-6 w-auto flex justify-center">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Bilde</Table.HeadCell>
            <Table.HeadCell>Navn</Table.HeadCell>
            <Table.HeadCell>Stilling</Table.HeadCell>
            <Table.HeadCell>E-post</Table.HeadCell>
            <Table.HeadCell>Telefon</Table.HeadCell>
            <Table.HeadCell>Gruppe</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {persons && persons.map((person) => (
              <Table.Row
                key={person.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {person.img ? (
                    <img className="rounded-full" src={`/upload/Personer/${person.img}`} alt="Person" style={{ width: '50px', height: '50px' }} />
                ) : (
                    <FaUserAlt />
                )}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {person.navn}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {person.stilling}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {person.epost}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {person.tlf}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {groups.find((group) => group.id === person.gruppe)?.navn}
                </Table.Cell>
                {/* Delete cell - Replace with Delete button */}
                <Table.Cell>
                  <Button onClick={() => deletePersonHandler(person.id)} color="failure">
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      
    </>
  );
};

export default Homepage_Menu;
