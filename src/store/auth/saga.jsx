import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../services/AuthService';
import { login, logout, setLogout, register, setRegisterErrors, setToken, setUser, getActiveUser, setLoginError } from './slice';

function* loginHandler(action) {
  try {
    yield put(setLoginError(null));
    const data = yield call(AuthService.login, action.payload);
    localStorage.setItem('token', data.token);
    yield put(setToken(data.token));
    yield put(setUser(data.user));
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      yield put(setLoginError(error.response.data.errors));
    }
  }
}

function* registerHandler(action) {
  yield put(setRegisterErrors(null));
  try {
    console.log(action);
    const data = yield call(AuthService.register, action.payload);
    localStorage.setItem('token', data.token);
    yield put(setToken(data.token));
    yield put(setUser(data.user));
  } catch (error) {
    console.error(error);
    if (error.response.status === 422) {
      yield put(setRegisterErrors(error.response.data.errors));
    }
  }
}

function* logoutHandler(action) {
  try {
    yield call(AuthService.logout);
  } catch (error) {
    // console.error(error);
    // console.log(error);
  } finally {
    localStorage.removeItem('token');
    yield put(setLogout());
  }
}

function* getActiveUserHandler(action) {
  try {
    const activeUser = yield call(AuthService.getActiveUser);
    yield put(setUser(activeUser));
  } catch (error) {
    console.error(error);
  }
}

export function* watchLogin() {
  yield takeLatest(login.type, loginHandler);
}

export function* watchLogout() {
  yield takeLatest(logout.type, logoutHandler);
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}

export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, getActiveUserHandler);
}
