// API endpoints

import Env from './env';

const makeURL = (url, version = Env.version) => {
  return `${Env.baseURL}/v${version}/${url}?apikey=${Env.apiKey}`;
};
const url = {
  login: makeURL('user/login'),
};

export default url;
