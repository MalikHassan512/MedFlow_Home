// Auth Actions

import {LOGIN_REQUEST} from '../types';

export const loginRequest = payload => {
  return {type: LOGIN_REQUEST, payload};
};

export const testAction = () => {
  return {type: 'TEST_CHECK'};
};
