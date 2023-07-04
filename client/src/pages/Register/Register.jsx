import React from 'react';
'use client';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const Register = () => {
    return(
      <div className="flex justify-center items-center h-screen">
      <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="name2"
            value="Your name"
          />
        </div>
        <TextInput
          id="name2"
          placeholder="Name"
          required
          shadow
          type="name"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email2"
            value="Your email"
          />
        </div>
        <TextInput
          id="email2"
          placeholder="name@flowbite.com"
          required
          shadow
          type="email"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password2"
            value="Your password"
          />
        </div>
        <TextInput
          id="password2"
          required
          shadow
          type="password"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="repeat-password"
            value="Repeat password"
          />
        </div>
        <TextInput
          id="repeat-password"
          required
          shadow
          type="password"
        />
      </div>
      <div className="flex items-center gap-2">
      </div>
      <Button type="submit">
        Register new account
      </Button>
    </form>
    </div>
    )
}

export default Register