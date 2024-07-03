import {describe, expect, it} from 'vitest';
import threadReducer from './reducer';

describe('threadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = {type: 'UNKNOWN'};

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            'id': 'thread-1',
            'title': 'Thread Pertama',
            'body': 'Ini adalah thread pertama',
            'category': 'General',
            'createdAt': '2021-06-21T07:00:00.000Z',
            'ownerId': 'users-1',
            'upVotesBy': [],
            'downVotesBy': [],
            'totalComments': 0,
          },
          {
            'id': 'thread-2',
            'title': 'Thread Kedua',
            'body': 'Ini adalah thread kedua',
            'category': 'General',
            'createdAt': '2021-06-21T07:00:00.000Z',
            'ownerId': 'users-2',
            'upVotesBy': [],
            'downVotesBy': [],
            'totalComments': 0,
          },
        ],
      },
    };

    const nextState = threadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it(
      'should return the threads with the new thread when given by ADD_THREAD action',
      () => {
        const initialState = [{
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        },
        {
          'id': 'thread-2',
          'title': 'Thread Kedua',
          'body': 'Ini adalah thread kedua',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-2',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        }];
        const action = {
          type: 'ADD_THREAD',
          payload: {
            thread: {
              'id': 'thread-1',
              'title': 'Thread Pertama',
              'body': 'Ini adalah thread pertama',
              'category': 'General',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'ownerId': 'users-1',
              'upVotesBy': [],
              'downVotesBy': [],
              'totalComments': 0,
            },
          },
        };

        const nextState = threadReducer(initialState, action);

        expect(nextState).toEqual([action.payload.thread, ...initialState]);
      });

  it(
      'should return the threads with the upvoted thread when given by UPVOTE_THREAD action',
      () => {
        const initialState = [{
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        },
        {
          'id': 'thread-2',
          'title': 'Thread Kedua',
          'body': 'Ini adalah thread kedua',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-2',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        }];
        const action = {
          type: 'UPVOTE_THREAD',
          payload: {
            threadId: 'thread-1',
            userId: 'users-1',
          },
        };
        const updatedThread = {
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': ['users-1'],
          'downVotesBy': [],
          'totalComments': 0,
        };

        const nextState = threadReducer(initialState, action);

        expect(nextState[0]).toEqual(updatedThread);
      });

  it(
      'should return the threads with the downvoted thread when given by DOWNVOTE_THREAD action',
      () => {
        const initialState = [{
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        },
        {
          'id': 'thread-2',
          'title': 'Thread Kedua',
          'body': 'Ini adalah thread kedua',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-2',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        }];
        const action = {
          type: 'DOWNVOTE_THREAD',
          payload: {
            threadId: 'thread-1',
            userId: 'users-1',
          },
        };
        const updatedThread = {
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-1',
          'upVotesBy': [],
          'downVotesBy': ['users-1'],
          'totalComments': 0,
        };

        const nextState = threadReducer(initialState, action);

        expect(nextState[0]).toEqual(updatedThread);
      });
});
