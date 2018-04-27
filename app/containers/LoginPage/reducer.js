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
  formState: {
    username: '',
    password: '',
  },
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
      console.log("sending request");
      return state
        .set('currentlySending', action.sending);
  case LOGIN:
      return state
        .setIn(['formState', 'username'], action.username)
        .setIn(['formState', 'password'], action.password);
    case SIGNUP:
      return state
        .setIn(['formState', 'username'], action.username)
        .setIn(['formState', 'password'], action.password);
    case SET_AUTH:
      return state
        .set('loggedIn', action.newState);
    case SET_ERROR_MESSAGE:
      return state
        .set('errorMessage', action.message);
    case LOGOUT:
      console.log("reducer LOGOUT");
      return state
        .setIn(['formState', 'username'], '')
        .setIn(['formState', 'password'], '');
    case CHANGE_FORM:
      return state
        .setIn(['formState', 'username'], action.username)
        .setIn(['formState', 'password'], action.password);
    default:
      return state;
  }
}

export default loginPageReducer;
