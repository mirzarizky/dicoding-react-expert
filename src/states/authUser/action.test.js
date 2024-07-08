import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import api from '../../utils/api';
import {asyncSetAuthUser} from './action';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {setAuthUserActionCreator} from '../authUser/action';

/**
 * test scenario for asyncSetAuthUser thunk function
 *
 * - asyncSetAuthUser thunk
 *    - should dispatch action correctly when email and password are correct
 *    - should dispatch action and alert when data login failed
 *
 */
describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    api.login = api._login;

    delete api._getOwnProfile;
    delete api._login;
  });

  it(
      'should dispatch action correctly when email and password are correct',
      async () => {
        // arrange
        // stub
        api.login = () => Promise.resolve(fakeLoginResponse);
        api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);

        // mock dispatch
        const dispatch = vi.fn();

        // action
        const credentials = {
          email: 'john@example.com',
          password: 'password',
        };
        await asyncSetAuthUser(credentials)(dispatch);

        // expect
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            setAuthUserActionCreator(fakeOwnProfileResponse),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });

  it(
      'should dispatch action and alert when data login failed',
      async () => {
        // arrange
        // stub
        api.login = () => Promise.reject(fakeErrorResponse);

        // mock dispatch
        const dispatch = vi.fn();
        window.alert = vi.fn();

        // action
        const credentials = {
          email: 'john@example.com',
          password: 'wrong-password',
        };
        await asyncSetAuthUser(credentials)(dispatch);

        // expect
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });
});

const fakeOwnProfileResponse = {
  'id': 'john_doe',
  'name': 'John Doe',
  'email': 'john@example.com',
  'avatar': 'https://generated-image-url.jpg',
};
const fakeLoginResponse = {
  'token': 'long-correct-token-here',
};

const fakeErrorResponse = new Error('Ups, something went wrong');
