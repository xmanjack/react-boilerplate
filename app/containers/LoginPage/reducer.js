/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import auth from '../../utils/auth';

import {
    SENDING_REQUEST,
    LOGIN,
    SIGNUP,
    SET_AUTH,
    SET_ERROR_MESSAGE,
    LOGOUT,
    CHANGE_FORM,
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
} from './constants';


const initialState = fromJS({
  username: '',
  password: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  errorMessage: '',
});

function loginPageReducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_USERNAME:
        return state
        .set('username', action.name);
    case CHANGE_PASSWORD:
        return state
        .set('password', action.password);
    case SENDING_REQUEST:
      return state
        .set('currentlySending', action.sending);
    case SIGNUP:
      return state
        .setIn([ 'username'], action.username)
        .setIn([ 'password'], action.password);
    case SET_AUTH:
      return state
        .setIn(['loggedIn'], action.newState);
    case SET_ERROR_MESSAGE:
      return state
        .set('errorMessage', action.message);
    case LOGOUT:
      return state
        .setIn([ 'username'], '')
        .setIn([ 'password'], '');
    default:
      return state;
  }
}

export default loginPageReducer;
