/**
 * @TODO: Define all the actions (creator) for the users state
 */

import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users,
        },
    };
}

function asyncRegisterUser({ name, email, password }) {
    return async (dispatch) => {
        try {
            await api.register({ name, email, password });
            const token = await api.login({ email, password });
            api.putAccessToken(token);
            const authUser = await api.getOwnProfile();
            dispatch(setAuthUserActionCreator(authUser));
        } catch (error) {
            alert(error.message);
        }
    };
}

export {
    ActionType,
    receiveUsersActionCreator,
    asyncRegisterUser,
};