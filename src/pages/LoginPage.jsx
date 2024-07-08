import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {asyncSetAuthUser} from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authUser = null} = useSelector((states) => states);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  function onLogin({email, password}) {
    dispatch(asyncSetAuthUser({email, password}));
  }

  return (
    <div className="container px-2 py-6 mx-auto max-w-7xl">
      <LoginInput login={onLogin} />
    </div>
  );
}
