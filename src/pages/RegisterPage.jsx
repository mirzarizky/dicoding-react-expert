import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../utils/useInput';
import {asyncRegisterUser} from '../states/users/action';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirmation, onPasswordCongirmationChange] = useInput('');
  const {authUser = null} = useSelector((states) => states);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      return;
    }

    dispatch(asyncRegisterUser({name, email, password}));
  }

  return (
    <div className="container px-2 py-6 mx-auto max-w-7xl">
      <div className="w-full max-w-md mx-auto rounded">
        <h1 className="text-lg text-gray-900 dark:text-white">
          Fill the form to register account.
        </h1>

        <div className="w-full p-6 mt-4 bg-white border rounded">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Name
              </p>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Jon Doe"
                  value={name}
                  onChange={onNameChange}
                  required
                />
              </div>
            </div>
            <div>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email
              </p>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={onPasswordChange}
                  required
                />
              </div>
            </div>
            <div>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Confirm Password
              </p>
              <div className="mt-1">
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  className="block w-full rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={passwordConfirmation}
                  onChange={onPasswordCongirmationChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white transition bg-gray-900 border border-gray-900 rounded-full hover:bg-white hover:text-gray-900"
              >
                Register
              </button>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {'Already have an account?'}{' '}
                <Link to="/login" className="underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
