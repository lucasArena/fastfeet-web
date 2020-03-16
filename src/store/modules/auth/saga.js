import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import * as Actions from './actions';

function* signInRequest({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { user, token } = response;

    yield put(Actions.signInSuccess(user, token));
    history.push('/orders');
  } catch (err) {
    console.tron.log(err);
    toast.error('Email ou senha inválidos');
    yield put(Actions.signFailure());
  }
}

function signOut() {
  history.push('/');
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signInRequest),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
