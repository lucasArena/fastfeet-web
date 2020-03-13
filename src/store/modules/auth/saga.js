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

    const { user } = response;

    yield put(Actions.signInSuccess(user));
    history.push('/orders');
  } catch (err) {
    console.tron.log(err);
    toast.error('Email ou senha inválidos');
    yield put(Actions.singFailure());
  }
}

function signOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signInRequest),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
