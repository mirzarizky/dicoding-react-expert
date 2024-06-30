import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../utils/useInput';
import {asyncCreateThread} from '../states/threads/action';

export default function CreateThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onContentChange] = useInput('');
  const {authUser = null} = useSelector((states) => states);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    dispatch(asyncCreateThread({title, category, body}));
    navigate('/');
  }

  return (
    <div className="container px-2 py-6 mx-auto max-w-7xl">
      <div className="w-full max-w-md mx-auto rounded">
        <h1 className="text-lg text-gray-900 dark:text-white">
          Create New Thread
        </h1>

        <div className="w-full p-6 mt-4 bg-white border rounded">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Title
              </p>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-md dark:text-white border-0 py-1.5 px-2 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Title"
                  value={title}
                  onChange={onTitleChange}
                  required
                />
              </div>
            </div>
            <div>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Category
              </p>
              <div className="mt-1">
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="block w-full rounded-md dark:text-white border-0 py-1.5 px-2 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="Category"
                  value={category}
                  onChange={onCategoryChange}
                />
              </div>
            </div>
            <div>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Content
              </p>
              <div className="mt-1">
                <textarea
                  onChange={onContentChange}
                  className="block px-2 w-full rounded-md dark:text-white border-0 py-1.5 dark:bg-gray-800 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:focus:ring-gray-300 focus:ring-gray-600 sm:text-sm sm:leading-6 min-h-20"
                  required
                />
              </div>
            </div>


            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white transition bg-gray-900 border border-gray-900 rounded-full hover:bg-white hover:text-gray-900"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
