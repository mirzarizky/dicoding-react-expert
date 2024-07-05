import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import api from '../../utils/api';
import {asyncPreloadProcess, setIsPreloadActionCreator} from './action';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {setAuthUserActionCreator} from '../authUser/action';

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  it(
      'should dispatch action correctly when data fetching success',
      async () => {
        // arrange
        // stub
        api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);

        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncPreloadProcess()(dispatch);

        // expect
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            setAuthUserActionCreator(fakeOwnProfileResponse),
        );
        expect(dispatch).toHaveBeenCalledWith(
            setIsPreloadActionCreator(false),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });

  it(
      'should dispatch action and set user correctly when data fetching failed',
      async () => {
        // arrange
        // stub
        api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

        // mock dispatch
        const dispatch = vi.fn();

        // action
        await asyncPreloadProcess()(dispatch);

        // expect
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            setAuthUserActionCreator(null),
        );
        expect(dispatch).toHaveBeenCalledWith(
            setIsPreloadActionCreator(false),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });
});

const fakeOwnProfileResponse = {
  'id': 'john_doe',
  'name': 'John Doe',
  'email': 'john@example.com',
  'avatar': 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');
