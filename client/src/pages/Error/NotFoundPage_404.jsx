import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Logo from '../../img/logo.png';

const NotFoundPage_404 = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:w-full xl:w-1/2 relative pb-12 lg:pb-15">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="text-7xl font-bold text-gray-500 mb-4">404 Page Not Found</h1>
              <h1 className="my-2 text-gray-800 font-bold text-2xl mb-10 mt-5">
                Oops, ser ut denne siden finnes ikke lenger
              </h1>
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

export default NotFoundPage_404;
