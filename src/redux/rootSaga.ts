import { all } from 'redux-saga/effects';

import userDataSagas from './Users/sagas';
import authenticationSagas from './Authentication/sagas';
import projectDataSagas from './Projects/sagas';
import taskDataSagas from './Tasks/sagas';
import trashSagas from './Trash/sagas';

function* rootSaga() {
  yield all([
    ...userDataSagas,
    ...authenticationSagas,
    ...projectDataSagas,
    ...taskDataSagas,
    ...trashSagas,
  ]);
}

export default rootSaga;
