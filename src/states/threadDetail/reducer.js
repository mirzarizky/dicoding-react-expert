import {ActionType} from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId) ?
          [...threadDetail.upVotesBy] :
          [...threadDetail.upVotesBy, action.payload.userId],
      };
    case ActionType.DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId) ?
          threadDetail.upVotesBy.filter((id) => id !== action.payload.userId) :
          [...threadDetail.upVotesBy],
      };
    case ActionType.COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
