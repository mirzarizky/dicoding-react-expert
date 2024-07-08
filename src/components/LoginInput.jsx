import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../utils/useInput';

function LoginInput({login}) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmit(event) {
    event.preventDefault();

    login({email, password});
  }

  return (
    <div className="w-full max-w-md mx-auto rounded">
      <h1 className="text-lg text-gray-900 dark:text-white">Login</h1>

      <div className="w-full p-6 mt-4 bg-white border rounded">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email
            </p>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full px-2 rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>
          </div>
          <div>
            <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Password
            </p>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full px-2 rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                required
                placeholder='Password'
                value={password}
                onChange={onPasswordChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              role='button'
              type="submit"
              className="px-4 py-2 text-sm text-white transition bg-gray-900 border border-gray-900 rounded-full hover:bg-white hover:text-gray-900"
            >
                Login
            </button>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {'Don\'t have account?'}{' '}
              <Link to="/register" className="text-gray-900 underline">
                  Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

const loginInputShape = {
  login: PropTypes.func.isRequired,
};

LoginInput.propTypes = {
  ...loginInputShape,
};

export default LoginInput;
