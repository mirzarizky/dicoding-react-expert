import {showLoading, hideLoading} from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  COMMENT_THREAD_DETAIL: 'COMMENT_THREAD_DETAIL',
};

function receiveThreadDetailAction(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailAction() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upvoteThreadDetailActionAction(userId, threadId) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function downvoteThreadDetailActionAction(userId, threadId) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function addCommentThreadDetailAction(comment, threadId) {
  return {
    type: ActionType.COMMENT_THREAD_DETAIL,
    payload: {
      comment,
      threadId,
    },
  };
}

function asyncReceiveTalkDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailAction());
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailAction(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const {authUser, threadDetail} = getState();
    dispatch(upvoteThreadDetailActionAction(authUser.id, threadDetail.id));
    dispatch(showLoading());
    try {
      await api.upvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const {authUser, threadDetail} = getState();
    dispatch(downvoteThreadDetailActionAction(authUser.id, threadDetail.id));

    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddCommentThread(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentThreadDetailAction(comment, threadId));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailAction,
  clearThreadDetailAction,
  upvoteThreadDetailActionAction,
  downvoteThreadDetailActionAction,
  asyncReceiveTalkDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  addCommentThreadDetailAction,
  asyncAddCommentThread,
};
