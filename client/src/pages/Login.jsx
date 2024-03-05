import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div>
      <Navbar />
      <div id='main' className='bg-red-600 h-screen'>
        <div className='w-full h-screen absolute top-0 left-0'>
          <div className='max-w-[700px] m-auto h-full w-full flex flex-col justify-center lg:items-start items-center'>
            <h1 className='sm:text-5xl text-3xl font-bold text-blue-600'>
              Welcome to ChitChat Central
            </h1>
            <h2 className='flex sm:text-3xl text-4xl pt-6 text-blue-600'>
              The Next
              <TypeAnimation
                sequence={[
                  'Hotspot',
                  1000,
                  'Messenger',
                  1000,
                  'Connection',
                  1000,
                ]}
                wrapper='div'
                cursor={true}
                speed={50}
                style={{ fontSize: '1em', paddingLeft: '5px' }}
                repeat={Infinity}
              />
            </h2>
            {/* Login Form */}
            <form className='mt-8 max-w-md w-full'>
              <div className='grid grid-cols-1 gap-6'>
                <label className='block text-sm font-medium text-blue-600'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='mt-1 p-2 border rounded-md w-full'
                  placeholder='you@example.com'
                />
              </div>
              <div className='grid grid-cols-1 gap-6 mt-4'>
                <label className='block text-sm font-medium text-blue-600'>
                  Password
                </label>
                <input
                  type='password'
                  className='mt-1 p-2 border rounded-md w-full'
                  placeholder='********'
                />
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full p-2 bg-blue-600 text-red-600 rounded-md'
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
