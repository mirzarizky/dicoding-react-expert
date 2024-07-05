import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import api from '../../utils/api';
import {asyncRegisterUser} from './action';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {setAuthUserActionCreator} from '../authUser/action';

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._register = api.register;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.register = api._register;
    api.getOwnProfile = api._getOwnProfile;
    api.login = api._login;

    delete api._getOwnProfile;
    delete api._register;
    delete api._login;
  });

  it(
      'should dispatch action correctly when register success',
      async () => {
        // arrange
        // stub
        api.register = () => Promise.resolve(fakeRegisterResponse);
        api.login = () => Promise.resolve(fakeLoginResponse);
        api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);

        // mock dispatch
        const dispatch = vi.fn();

        // action
        const user = {
          name: 'john',
          email: 'john@example.com',
          password: 'password',
        };
        await asyncRegisterUser(user)(dispatch);

        // expect
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            setAuthUserActionCreator(fakeOwnProfileResponse),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });

  it(
      'should dispatch action correctly and alert when register failed',
      async () => {
        // arrange
        // stub
        api.register = () => Promise.reject(fakeErrorResponse);
        api.login = () => Promise.reject(fakeErrorResponse);
        api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

        // mock dispatch
        const dispatch = vi.fn();
        window.alert = vi.fn();

        // action
        const credentials = {
          email: 'john@example.com',
          password: 'wrong-password',
        };
        await asyncRegisterUser(credentials)(dispatch);

        // expect
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      },
  );
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
const fakeRegisterResponse = {
  'user': {
    'id': 'user-123',
    'name': 'John Doe',
    'email': 'john@example.com',
    'avatar': 'https://generated-image-url.jpg',
  },
};

const fakeErrorResponse = new Error('Ups, something went wrong');
