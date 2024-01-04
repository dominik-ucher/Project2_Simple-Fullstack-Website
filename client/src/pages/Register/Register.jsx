import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../img/logo.png'
import axios from "axios";
'use client';
import { Button, Label, TextInput } from 'flowbite-react';
import { AuthContext } from '../../context/authContext';

const Register = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any of the input fields are empty
    if (!inputs.username || !inputs.email || !inputs.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axiosInstance.post("/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const navigate_2 = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate_2]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img className="w-auto h-40 p-5" src={Logo} alt="" />
      <div className="bg-gray-200 p-6 rounded-md shadow-md">
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Registrer</h2>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name2"
                value="Din Navn"
              />
            </div>
            <TextInput
              id="username"
              placeholder="Navn"
              required
              shadow
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email2"
                value="Din E-post"
              />
            </div>
            <TextInput
              id="email"
              placeholder="navn@gmail.com"
              required
              shadow
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                value="Din Passord"
              />
            </div>
            <TextInput
              id="password"
              required
              shadow
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
          </div>
          <Button type="submit" onClick={handleSubmit}>
            Registrer ny konto
          </Button>
          {err && <p className='text-red-500 font-bold flex jusitfy-center items-center'>{err}</p>}
        </form>
      </div>
    </div>
  )
}

export default Register;
