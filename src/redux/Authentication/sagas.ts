import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';

import {
  actionTypes,
  logInSuccess,
  registerSuccess,
  refreshTokenSuccess,
  authenticationError,
} from './actions';

import api from './api';
import Router from 'next/router';
import Cookies from 'js-cookie';

function* login(args: any) {
  try {
    const data = yield call(api.logInProcess, args.payload.data);
    yield put(logInSuccess(data));
  } catch (error) {
    yield put(authenticationError(error));
  }
};

function* watchLogin() {
  yield takeLatest(actionTypes.LOG_IN, login);
};

function* loginSuccess(args: any) {
  sessionStorage.setItem('access_token', args.payload.data.data.access_token);
  sessionStorage.setItem('access_token_expire_time', (Date.now() + 30 * 60 * 1000).toString());
  Cookies.set("refresh_token", args.payload.data.data.refresh_token, {
    expires: 1
  });
  Router.push('/');
};

function* watchLoginSuccess() {
  yield takeLatest(actionTypes.LOG_IN_SUCCESS, loginSuccess);
};

function* register(args: any) {
  try {
    const data = yield call(api.registerProcess, args.payload.data);
    yield put(registerSuccess(data));
  } catch (error) {
    yield put(authenticationError(error));
  }
};

function* watchRegister() {
  yield takeLatest(actionTypes.REGISTER, register);
};

function* watchRegisterSucces() {
  yield takeLatest(actionTypes.REGISTER_SUCCESS, handleLoadLoginPage);
};

function* refreshToken(args: any) {
  try {
    const access_token = sessionStorage.getItem('access_token');
    const access_token_expire_time = sessionStorage.getItem('access_token_expire_time');
    if ((!access_token && !access_token_expire_time) || 
      (Date.now() >= Number(access_token_expire_time))) {
      const result = yield call(api.refreshToken, args.payload.data);
      yield put(refreshTokenSuccess(result.data));
    } else {
      yield put(refreshTokenSuccess({access_token: access_token}));
    }
  } catch (error) {
    yield put(authenticationError(error));
  }
}

function* watchRefreshToken() {
  yield takeLatest(actionTypes.REFRESH_TOKEN, refreshToken);
};

function* handleLoadLoginPage() {
  Router.push('/login');
};

const sagas = [
  fork(watchLogin),
  fork(watchLoginSuccess),
  fork(watchRegister),
  fork(watchRegisterSucces),
  fork(watchRefreshToken),
];

export default sagas;
