import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Table } from 'flowbite-react';

const Payment_Edit = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  })

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get('/api/payment_sql/')
      setCustomer(response.data);
    } catch  (error) {
      console.error('Error fetching customers', error);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);


  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Oversikt over Regninger</h1>

      <div className="overflow-x-auto mt-20">
        <Table striped>
            <Table.Head>
            <Table.HeadCell>Fornavn</Table.HeadCell>
            <Table.HeadCell>Etternavn</Table.HeadCell>
            <Table.HeadCell>E-post</Table.HeadCell>
            <Table.HeadCell>Telefon</Table.HeadCell>
            <Table.HeadCell>Vare</Table.HeadCell>
            <Table.HeadCell>Pris</Table.HeadCell>
            <Table.HeadCell>Beskrivelse</Table.HeadCell>
            <Table.HeadCell>Forfalls Dato</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Re-send</Table.HeadCell>
            <Table.HeadCell>Slett</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            {customer && customer.map((cust) => ( 
            <Table.Row key={cust.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{cust.fornavn || ''}</Table.Cell>
                <Table.Cell>{cust.etternavn || ''}</Table.Cell>
                <Table.Cell>{cust.epost || ''}</Table.Cell>
                <Table.Cell>{cust.telefon || ''}</Table.Cell>
                <Table.Cell>{cust.vare || ''}</Table.Cell>
                <Table.Cell>{cust.pris || ''},-</Table.Cell>
                <Table.Cell>{cust.beskrivelse || ''}</Table.Cell>
                <Table.Cell>{cust.forfallsdato && new Date(cust.forfallsdato).toLocaleDateString('nb-NO')}</Table.Cell>
                <Table.Cell>{cust.status || ''}</Table.Cell>
                <Table.Cell>Sende pånytt</Table.Cell>
                <Table.Cell>Slett</Table.Cell>
            </Table.Row>
            ))}
            </Table.Body>
        </Table>
       </div>

      
    </>
  );
};

export default Payment_Edit;
