import React from 'react';
import { Link } from 'react-router-dom';
const {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaLinkedin,
} = require('../utils/constant'); // Import icons

const { logo } = require('../utils/constant');

function LoginForm() {
  return (
    <div className='rounded-3xl max-w-md mx-auto shadow-lg lg:mt-48 lg:mb-48 md:mb-24 md:mt-24 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 lg:min-h-180 border border-gray-300'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src={logo}
          alt='Your Company'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Login to your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <form
          className='space-y-6'
          action='#'
          method='POST'
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-1'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='text-sm'>
                <a
                  href='/'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className='mt-1'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <label
              htmlFor='remember-me'
              className='ml-2 block text-sm text-gray-900'
            >
              Keep me logged in
            </label>
          </div>
          <div>
            <button
              type='submit'
              className='w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Log in
            </button>
          </div>
        </form>
        <p className='mt-4 text-center text-sm text-gray-500'>
          Not registered yet?{' '}
          <Link
            to='/signup'
            className='font-semibold text-indigo-600 hover:text-indigo-500'
          >
            Create an Account
          </Link>
        </p>
        {/* Sign in with icons */}
        <div className='flex justify-center mt-6 space-x-4'>
          <a
            href='/'
            className='text-gray-500 hover:text-gray-700'
          >
            <FaGoogle className='w-6 h-6' />
          </a>
          <a
            href='/'
            className='text-gray-500 hover:text-gray-700'
          >
            <FaGithub className='w-6 h-6' />
          </a>
          <a
            href='/'
            className='text-gray-500 hover:text-gray-700'
          >
            <FaFacebook className='w-6 h-6' />
          </a>
          <a
            href='/'
            className='text-gray-500 hover:text-gray-700'
          >
            <FaLinkedin className='w-6 h-6' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
