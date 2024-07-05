/* eslint-disable max-len */
import {describe, expect, it} from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = {type: 'UNKNOWN'};

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it(
      'should return the detail thread when given by RECEIVE_THREAD_DETAIL action',
      () => {
        const initialState = {};
        const action = {
          type: 'RECEIVE_THREAD_DETAIL',
          payload: {
            threadDetail: {
              'id': 'thread-1',
              'title': 'Thread Pertama',
              'body': 'Ini adalah thread pertama',
              'category': 'General',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
              'comments': [
                {
                  'id': 'comment-1',
                  'content': 'Ini adalah komentar pertama',
                  'createdAt': '2021-06-21T07:00:00.000Z',
                  'owner': {
                    'id': 'users-1',
                    'name': 'John Doe',
                    'avatar': 'https://generated-image-url.jpg',
                  },
                  'upVotesBy': [],
                  'downVotesBy': [],
                },
              ],
            },
          },
        };

        const nextState = threadDetailReducer(initialState, action);

        expect(nextState).toEqual(action.payload.threadDetail);
      });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    const initialState = {
      'id': 'thread-1',
      'title': 'Thread Pertama',
      'body': 'Ini adalah thread pertama',
      'category': 'General',
      'createdAt': '2021-06-21T07:00:00.000Z',
      'owner': {
        'id': 'users-1',
        'name': 'John Doe',
        'avatar': 'https://generated-image-url.jpg',
      },
      'upVotesBy': [],
      'downVotesBy': [],
      'comments': [
        {
          'id': 'comment-1',
          'content': 'Ini adalah komentar pertama',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': [],
          'downVotesBy': [],
        },
      ],
    };

    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(null);
  });

  it(
      'should return the thread with the upvoted thread when given by UPVOTE_THREAD action',
      () => {
        const initialState = {
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': [],
          'downVotesBy': [],
          'comments': [
            {
              'id': 'comment-1',
              'content': 'Ini adalah komentar pertama',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          ],
        };
        const action = {
          type: 'UPVOTE_THREAD_DETAIL',
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
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': ['users-1'],
          'downVotesBy': [],
          'comments': [
            {
              'id': 'comment-1',
              'content': 'Ini adalah komentar pertama',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          ],
        };

        const nextState = threadDetailReducer(initialState, action);

        expect(nextState).toEqual(updatedThread);
      });

  it(
      'should return the thread with the downvoted thread when given by DOWNVOTE_THREAD action',
      () => {
        const initialState = {
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': [],
          'downVotesBy': [],
          'comments': [
            {
              'id': 'comment-1',
              'content': 'Ini adalah komentar pertama',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          ],
        };
        const action = {
          type: 'DOWNVOTE_THREAD_DETAIL',
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
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': [],
          'downVotesBy': ['users-1'],
          'comments': [
            {
              'id': 'comment-1',
              'content': 'Ini adalah komentar pertama',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          ],
        };

        const nextState = threadDetailReducer(initialState, action);

        expect(nextState).toEqual(updatedThread);
      });

  it('should return the thread with the new comment when given by COMMENT_THREAD_DETAIL',
      () => {
        const initialState = {
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': [],
          'downVotesBy': [],
          'comments': [
            {
              'id': 'comment-1',
              'content': 'Ini adalah komentar pertama',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          ],
        };
        const action = {
          type: 'COMMENT_THREAD_DETAIL',
          payload: {
            threadId: 'thread-1',
            comment: {
              'id': 'comment-2',
              'content': 'komentar baru',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          },
        };
        const updatedThread = {
          'id': 'thread-1',
          'title': 'Thread Pertama',
          'body': 'Ini adalah thread pertama',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'avatar': 'https://generated-image-url.jpg',
          },
          'upVotesBy': [],
          'downVotesBy': [],
          'comments': [
            {
              'id': 'comment-1',
              'content': 'Ini adalah komentar pertama',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
            {
              'id': 'comment-2',
              'content': 'komentar baru',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'owner': {
                'id': 'users-1',
                'name': 'John Doe',
                'avatar': 'https://generated-image-url.jpg',
              },
              'upVotesBy': [],
              'downVotesBy': [],
            },
          ],
        };

        const nextState = threadDetailReducer(initialState, action);

        expect(nextState).toEqual(updatedThread);
      },
  );
});
