import {showLoading, hideLoading} from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
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

function upvoteThreadAction(userId, threadId) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}
function downvoteThreadAction(userId, threadId) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(upvoteThreadAction(authUser.id, threadId));
    dispatch(showLoading());
    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(downvoteThreadAction(authUser.id, threadId));

    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
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

export {
  ActionType,
  receiveThreadsAction,
  addThreadAction,
  asyncCreateThread,
  upvoteThreadAction,
  downvoteThreadAction,
  asyncUpvoteThread,
  asyncDownvoteThread,
};
