import {describe, expect, it} from 'vitest';
import preloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it(
      'should return the initial state when given by unknown action',
      () => {
        const initialState = true;
        const action = {type: 'UNKNOWN'};

        const nextState = preloadReducer(initialState, action);

        expect(nextState).toEqual(initialState);
      },
  );

  it(
      'should return the state when given by SET_IS_PRELOAD action',
      () => {
        const initialState = true;
        const action = {
          type: 'SET_IS_PRELOAD',
          payload: {
            isPreload: null,
          },
        };

        const nextState = preloadReducer(initialState, action);

        expect(nextState).toEqual(action.payload.isPreload);
      },
  );
});
