import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {asyncRegisterUser} from '../states/users/action';
import RegisterInput from '../components/RegisterInput';
import {Helmet} from 'react-helmet';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {authUser = null} = useSelector((states) => states);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  function onRegister({name, email, password}) {
    dispatch(asyncRegisterUser({name, email, password}));
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="container px-2 py-6 mx-auto max-w-7xl">
        <RegisterInput register={onRegister} />
      </div>
    </>
  );
}
