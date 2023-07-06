import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Logo from '../../img/logo.png';

const Unauthorized_401 = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:w-full xl:w-1/2 relative pb-12 lg:pb-15">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="text-7xl font-bold text-gray-500 mb-4">401 Unauthorized</h1>
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Oops, ser ut som du er ikke logget inn
              </h1>
              <p className="my-2 text-gray-800">
                Du kan logge inn ved å klikke{' '}
                <Link className="font-bold underline pointer" to="/login">
                  her
                </Link>
                , hvis ikke du har bruker kan du kontakte klubben for å få tildelt en bruker.
                Dette gjøres{' '}
                <Link className="font-bold underline pointer" to="/contact">
                  her
                </Link>
              </p>
              <Button color="dark">
                <Link to="/">Tilbake til hjemmesiden!</Link>
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div>
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Unauthorized_401;
