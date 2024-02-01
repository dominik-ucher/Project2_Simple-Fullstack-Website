import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Rosenborgbanenimg from '../../img/Rosenborgbanen.jpg'

const Baneplan_Page = () => {
  return (
    // <div className="grid grid-cols-10 gap-4">
      <div className="bg-white-200 px-6 md:px-48">
      <h1 className="flex items-center justify-center mt-14 mb-10 font-bold capitalize text-3xl md:text-5xl">
            Baneplan på Rosenborgbanen
          </h1>
          <div className='flex gap-10 justify-center mb-10'>
          <a href="#eleven" className="flex items-center justify-center text-2xl hover:pointer hover:text-blue-800 text-blue-500 underline">
            11-er bane
          </a>
          <a href="#niner" className="flex items-center justify-center text-2xl hover:pointer hover:text-blue-800 text-blue-500 underline">
            9-er bane
          </a>
          <a href="#sevener" className="flex items-center justify-center text-2xl hover:pointer hover:text-blue-800 text-blue-500 underline">
            7-er bane
          </a>
          </div>

            <img 
                className='rounded-3xl'
                src={Rosenborgbanenimg} 
                alt="" 
            />
        <div className="px-10">
          <div id="eleven">
            <iframe
              title="11-er"
              src="https://calendar.google.com/calendar/embed?src=trondfotball.no_17ksop50glmmu04sqv6rn6pnis%40group.calendar.google.com&ctz=Europe%2FOslo&mode=WEEK"
              style={{ border: 0 }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              className="mt-10"
            />
          </div>

          <div id="niner">
            <iframe
              title="9-er"
              src="https://calendar.google.com/calendar/embed?src=trondfotball.no_4gm4qn4ajv3vqo707popc9sj40%40group.calendar.google.com&ctz=Europe%2FOslo&mode=WEEK"
              style={{ border: 0 }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              className="mt-10"
            />
          </div>

          <div id="sevener">
            <iframe
              title="7-er"
              src="https://calendar.google.com/calendar/embed?src=trondfotball.no_vdk1l6dd7o86st9q22093oehsc%40group.calendar.google.com&ctz=Europe%2FOslo&mode=WEEK"
              style={{ border: 0 }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              className="mt-10"
            />
          </div>
        </div>
      </div>
  );
};

export default Baneplan_Page;
