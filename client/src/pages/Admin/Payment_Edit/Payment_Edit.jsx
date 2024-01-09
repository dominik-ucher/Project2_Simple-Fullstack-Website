import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import { Table } from 'flowbite-react';

const Payment_Edit = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);


  return (
    <>
      <h1 className='text-center mt-8 text-2xl font-bold'>Oversikt over Regninger</h1>

      <div className="overflow-x-auto mt-20 px-8">
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
            <Table.HeadCell>Rediger</Table.HeadCell>
            <Table.HeadCell>
                <span className="sr-only">Edit</span>
            </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Ola</Table.Cell>
                <Table.Cell>Nordman</Table.Cell>
                <Table.Cell>ola@gmail.com</Table.Cell>
                <Table.Cell>45195555</Table.Cell>
                <Table.Cell>Klubbhus Utleie</Table.Cell>
                <Table.Cell>4000,-</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>14.02.2024</Table.Cell>
                <Table.Cell>Betalt</Table.Cell>
                <Table.Cell>Sende pånytt</Table.Cell>
                <Table.Cell>Rediger</Table.Cell>
            </Table.Row>
            
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Ola</Table.Cell>
                <Table.Cell>Nordman</Table.Cell>
                <Table.Cell>ola@gmail.com</Table.Cell>
                <Table.Cell>45195555</Table.Cell>
                <Table.Cell>Klubbhus Utleie</Table.Cell>
                <Table.Cell>4000,-</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>14.02.2024</Table.Cell>
                <Table.Cell>Betalt</Table.Cell>
                <Table.Cell>Sende pånytt</Table.Cell>
                <Table.Cell>Rediger</Table.Cell>
            </Table.Row>

            </Table.Body>
        </Table>
       </div>

      
    </>
  );
};

export default Payment_Edit;
