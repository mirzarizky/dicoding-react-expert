import {showLoading, hideLoading} from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
};

function receiveThreadsAction(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadAction(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncCreateThread({title, category = '', body}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({title, category, body});
      dispatch(addThreadAction(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {ActionType, receiveThreadsAction, addThreadAction, asyncCreateThread};
