// import { take, call, put, select } from 'redux-saga/effects';

import { hashSync } from 'bcryptjs';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, cancel, select, take, takeLatest, put, race, takeEvery } from 'redux-saga/effects';
// import * as errorMessages from './errorMessages';
import { selectLoginPageDomain, makeSelectLoginUsername, makeSelectLoginPassword } from './selectors';
import { makeSelectUsername } from 'containers/HomePage/selectors';

import auth from '../../utils/auth';
import genSalt from '../../utils/salt';


import { push } from 'react-router-redux';

import {
    SENDING_REQUEST,
    LOGIN,
    SIGNUP,
    SET_AUTH,
    SET_ERROR_MESSAGE,
    LOGOUT,
    CHANGE_FORM,
} from './constants';

import {
    sendingRequest,
    setAuthState,
    changeForm,
    setErrorMessage,
} from './actions';


export function* authorize({ newUser, username, password }) {
  yield put(sendingRequest(true));

  try {
    const salt = genSalt(username);
    const hash = hashSync(password, salt);
    let response;

    if (newUser) {
      response = yield call(auth.signup, username, hash);
    } else {
        console.log("sagas.js", username);
	console.log("sagas.js", hash);
	response = yield call(auth.login, username, hash);
	console.log("response is", response);
    }

    return response;
  } catch (error) {
      yield put(setErrorMessage(error.message));
      console.log("error.message", error.message);
    return false;
  } finally {
    yield put(sendingRequest(false));
  }
    
}

export function* login() {
    const username = yield select(makeSelectLoginUsername());
    const password = yield select(makeSelectLoginPassword());
    const newUser = false;

    const winner = yield race({
	auth: call(authorize, { newUser, username, password }),
	logout: take(LOGOUT),
    });

  if (winner.auth) {
      yield put(setAuthState(true));
      yield put(changeForm('', ''));
      yield put(push('/features'));
  }
}

export function* signup() {
  const userDetails = yield select(makeSelectFormState());
  const username = userDetails.get('username');
  const password = userDetails.get('password');
  const newUser = true;

  const response = yield call(authorize, { newUser, username, password });
  console.log(response);

  if (response) {
    yield put(setAuthState(true));
    yield put(changeForm('', ''));
    forwardTo('/dashboard');
  }
}

export function* logout() { // eslint-disable-line consistent-return
  yield put(sendingRequest(true));

  try {
    const response = yield call(auth.logout);
    yield put(sendingRequest(false));
    return response;
  } catch (error) {
    console.log('bye - also, you have an error'); // eslint-disable-line no-console
  }
}

export function* callLogout() {
    console.log("callLogout XXXXXX ");
  yield put(setAuthState(false));
  yield call(logout);
  forwardTo('/');
}

function forwardTo(location) {
//    yield put(push(location));
}

export default function* LoginData() {
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(LOGIN, login);
  yield takeLatest(SIGNUP, signup);
}
