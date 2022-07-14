import * as authSagas from './auth/saga';
import * as carsSagas from './cars/saga';

const sagas = {
  ...authSagas,
  ...carsSagas,
};

export default sagas;
