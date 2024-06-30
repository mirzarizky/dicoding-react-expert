import api from '../../utils/api';
import {receiveThreadsAction} from '../threads/action';
import {receiveUsersActionCreator} from '../users/action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';


function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsAction(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {asyncPopulateUsersAndThreads};
