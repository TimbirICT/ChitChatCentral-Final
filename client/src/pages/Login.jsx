import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div>
      <Navbar />
      <div id='main'>
        <div className='w-full h-screen absolute top-0 left-0 bg-white/50'>
          <div className='max-w-[700px] m-auto h-full w-full flex flex-col justify-center lg:items-start items-center'>
            <h1 className='sm:text-5xl text-3xl font-bold text-gray-800'>Welcome to ChitChat Central</h1>
            <h2 className='flex sm:text-3xl text-2xl pt-4 text-gray-800'>
              The Next
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Hotspot',
                  1000, // wait 1s before replacing
                  'Messenger',
                  1000, // wait 1s before replacing
                  'connection',
                  1000, // wait 1s before replacing
                ]}
                wrapper='div'
                cursor={true}
                speed={50}
                style={{ fontSize: '1em', paddingLeft: '5px' }}
                repeat={Infinity}
              />
            </h2>
            

            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Login;
