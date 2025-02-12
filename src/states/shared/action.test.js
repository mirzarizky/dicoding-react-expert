import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import api from '../../utils/api';
import {asyncPopulateUsersAndThreads} from './action';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {receiveUsersActionCreator} from '../users/action';
import {receiveThreadsAction} from '../threads/action';

/**
 * test scenario for asyncPopulateUsersAndThread thunk function
 *
 * - asyncPopulateUsersAndThreads thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 *
 */

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup data
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it(
      'should dispatch action correctly when data fetching success',
      async () => {
        api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
        api.getAllThreads = () => Promise.resolve(fakeThreadsReponse);
        // mock dispatch
        const dispatch = vi.fn();

        await asyncPopulateUsersAndThreads()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            receiveUsersActionCreator(fakeUsersResponse),
        );
        expect(dispatch).toHaveBeenCalledWith(
            receiveThreadsAction(fakeThreadsReponse),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });

  it(
      'should dispatch action and call alert correctly when data fetching failed',
      async () => {
        api.getAllUsers = () => Promise.reject(fakeErrorResponse);
        api.getAllThreads = () => Promise.reject(fakeErrorResponse);
        // mock dispatch
        const dispatch = vi.fn();
        window.alert = vi.fn();

        await asyncPopulateUsersAndThreads()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });
});

const fakeThreadsReponse = [
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
];

const fakeUsersResponse = [
  {
    'id': 'john_doe',
    'name': 'John Doe',
    'email': 'john@example.com',
    'avatar': 'https://generated-image-url.jpg',
  },
  {
    'id': 'jane_doe',
    'name': 'Jane Doe',
    'email': 'jane@example.com',
    'avatar': 'https://generated-image-url.jpg',
  },
  {
    'id': 'fulan',
    'name': 'Si Fulan',
    'email': 'fulan@example.com',
    'avatar': 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');
