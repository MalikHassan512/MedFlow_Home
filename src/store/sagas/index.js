import {all, fork} from 'redux-saga/effects';

import login from './auth/login';
import authentication from './auth/authentication'

export default function* saga() {
  yield all([fork(login), fork(authentication)]);
}
