import React from 'react';
import Logo from '../../img/logo.png'
'use client';
import { Button, Label, TextInput } from 'flowbite-react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-gray-200 p-6 rounded-md shadow-md">
    <img src={Logo} alt="" className='flex mx-auto items-center w-35 h-20 mr-4'/>
    <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Log In</h2>
    <form className="flex max-w-md flex-col gap-4">
    <div>
        <div className="mb-2 block">
          <Label
            htmlFor="name1"
            value="Your name"
          />
        </div>
        <TextInput
          id="name1"
          placeholder="name"
          required
          type="name"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Your password"
          />
        </div>
        <TextInput
          id="password1"
          required
          type="password"
        />
      </div>
      <Button type="submit">
        Submit
      </Button>
    </form>
    </div>
    </div>
  );
};

export default Login;
