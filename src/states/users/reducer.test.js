import {describe, expect, it} from 'vitest';
import userReducer from './reducer';

/**
 * test scenario for userReducer function
 *
 * - userReducer function
 *    - should return the initial state when given by unknown action
 *    - should return the users when given by RECEIVE_USERS action
 *
 */

describe('userReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = {type: 'UNKNOWN'};

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given by RECEIVE_USERS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_USERS',
      payload: {
        users: [
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
        ],
      },
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
