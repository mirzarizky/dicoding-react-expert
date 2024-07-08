import React, {useEffect} from 'react';
import {Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {asyncPreloadProcess} from './states/isPreload/action';
import {asyncUnsetAuthUser} from './states/authUser/action';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {authUser = null, isPrealod = false} = useSelector((state) => state);

  function onClickLogin() {
    navigate('/login');
  }

  function onClickLogout() {
    dispatch(asyncUnsetAuthUser());
  }

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <>
      <div className='loading'>

        <LoadingBar updateTime={100} style={{backgroundColor: 'blue', height: '5px'}} showFastActions />
      </div>
      {!isPrealod ? (
        <>
          <nav className="bg-white border-b border-gray-900">
            <div className="container px-2 py-4 mx-auto transition max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <Link to="/">Dicoding Forum</Link>
                </div>
                <div className="">
                  {authUser ? (
                    <button
                      onClick={onClickLogout}
                      className="px-4 py-2 text-sm text-gray-900 transition border border-gray-900 rounded-full hover:text-white hover:bg-gray-900"
                      type="button"
                    >
                      Logout
                    </button>
                  ) : location.pathname != '/login' ? (
                    <button
                      onClick={onClickLogin}
                      className="px-4 py-2 text-sm text-gray-900 transition border border-gray-900 rounded-full hover:text-white hover:bg-gray-900"
                      type="button"
                    >
                      Login
                    </button>
                  ): ''}
                </div>
              </div>
            </div>
          </nav>
          <div className="container mx-auto transition lg:px-2 max-w-7xl">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create" element={<CreateThreadPage />} />
              <Route path="/thread/:id" element={<ThreadDetailPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default App;
