/*
 *
 * LoginPage actions
 *
 */

import {
    DEFAULT_ACTION,
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

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sendingRequest(sending) {
  return {
    type: SENDING_REQUEST,
    sending,
  };
}

export function login() {
    return {
    type: LOGIN,
  };
}

export function signup(username, password) {
  return {
    type: SIGNUP,
    username,
    password,
  };
}

export function setAuthState(newState) {
  console.log("set auth state =", newState);
  return {
    type: SET_AUTH,
    newState,
  };
}

export function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    message,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function changeForm(newState) {
  return {
    type: CHANGE_FORM,
    newState,
  };
}

