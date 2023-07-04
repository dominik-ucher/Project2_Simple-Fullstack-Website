import React from 'react';
'use client';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
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
            htmlFor="email1"
            value="Your email"
          />
        </div>
        <TextInput
          id="email1"
          placeholder="name@flowbite.com"
          required
          type="email"
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
  );
};

export default Login;
