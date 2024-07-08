import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {asyncRegisterUser} from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

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
    <div className="container px-2 py-6 mx-auto max-w-7xl">
      <RegisterInput register={onRegister} />
    </div>
  );
}
