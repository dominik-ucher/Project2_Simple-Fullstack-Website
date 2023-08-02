import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Button, FileInput, Label, Select, Table, TextInput } from 'flowbite-react';

const Sponsor_Edit = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({
    img: '',
    link: '',
    type: 'Hoved',
  });

  useEffect(() => {
    axios.get('http://localhost:8800/api/sponsor', { withCredentials: true }) // Add withCredentials
      .then(response => setSponsors(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleFileChange = (event) => {
    setNewSponsor({
      ...newSponsor,
      img: event.target.files[0],
    });
  };

  const handleLinkChange = (event) => {
    setNewSponsor({
      ...newSponsor,
      link: event.target.value,
    });
  };

  const handleTypeChange = (event) => {
    setNewSponsor({
      ...newSponsor,
      type: event.target.value,
    });
  };

  const handleAddSponsor = () => {
    const formData = new FormData();
    formData.append('file', newSponsor.img);
    formData.append('link', newSponsor.link);
    formData.append('type', newSponsor.type);

    axios.post('http://localhost:8800/api/upload_sponsorbilde', formData, { withCredentials: true }) // Add withCredentials
      .then(response => {
        return axios.post('http://localhost:8800/api/sponsor', {
          img: response.data,
          link: newSponsor.link,
          type: newSponsor.type,
        }, { withCredentials: true }); // Add withCredentials
      })
      .then(response => {
        setSponsors([...sponsors, response.data]);
        setNewSponsor({
          img: '',
          link: '',
          type: 'Hoved',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8800/api/sponsor/${id}`, { withCredentials: true }) // Add withCredentials
      .then(() => {
        setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mt-5'>Sponsor Management</h1>
      <Table className='mt-10'>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Link</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {sponsors.map(sponsor => (
            <Table.Row key={sponsor.id}>
              <Table.Cell><img src={`http://localhost:5173/upload/Sponsor_Bilder/${sponsor.img}`} alt="Sponsor"  className="max-w-[250px] max-h-[250px]"/></Table.Cell>
              <Table.Cell><a href={sponsor.link} target="_blank" rel="noopener noreferrer">{sponsor.link}</a></Table.Cell>
              <Table.Cell>{sponsor.type}</Table.Cell>
              <Table.Cell>
                <Button color="failure" size="xs" onClick={() => handleDelete(sponsor.id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <h2 className='font-bold text-3xl mt-5'>Add New Sponsor</h2>

      <div className="max-w mt-5 flex items-center jusitfy-center space-x-4" id="addSponsor">

      <div className="max-w-md mt-5" id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file"value="Upload file"/>
      </div>
      <FileInput id="file" onChange={handleFileChange}/>
      </div>

      {/* <input type="file" onChange={handleFileChange} /> */}
      <div>
        <div className="mb-2 block mt-5">
          <Label color="gray" htmlFor="input-gray" value="Link" />
        </div>
        <TextInput
          color="gray"
          id="input-gray"
          placeholder="Link"
          type="text"
          value={newSponsor.link}
          onChange={handleLinkChange}
          required
        />
      </div>
      {/* <input type="text" placeholder="Link" value={newSponsor.link} onChange={handleLinkChange} /> */}
      {/* <select value={newSponsor.type} onChange={handleTypeChange}>
        <option value="Hoved">Hoved</option>
        <option value="Gull">Gull</option>
        <option value="Solv">Solv</option>
        <option value="Bronse">Bronse</option>
      </select> */}

      <div className="max-w-md mt-5" id="select">
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Select your country"/>
      </div>
      <Select id="type" value={newSponsor.type} onChange={handleTypeChange} required>
        <option value="Hoved">Hoved</option>
        <option value="Gull">Gull</option>
        <option value="Solv">Solv</option>
        <option value="Bronse">Bronse</option>
      </Select>
    </div>

      <Button className="mt-12" color="dark" onClick={handleAddSponsor}>Add Sponsor</Button>
      </div>
    </div>
    
  );
};

export default Sponsor_Edit;