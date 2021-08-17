import { takeLatest, call, put, take, fork, takeEvery } from 'redux-saga/effects';

import {
  actionTypes,
  getUsersSuccess,
  getUserDetailSuccess,
  usersError,
  checkMessageReturn,
} from './actions';

import api from './api';
import User from '../../interfaces/User';

function* getAllUsers() {
  try {
    const data: User[] = yield api.getUsersData();
    yield put(getUsersSuccess(data));
  } catch (err) {
    yield put(usersError(err));
  }
}

function* watchGetAllUsers() {
  yield takeLatest(actionTypes.GET_ALL_USERS, getAllUsers);
}

function* getActiveUsers() {
  try {
    const data: User[] = yield api.getUsersData();
    // yield put(getTrashUsersSuccess(data.filter((user) => user.isDeleted === false)));
    yield put(getUsersSuccess((data.filter((user) => user.isDeleted === false)).sort((a, b)=> (Number(a.id) - Number(b.id))))); 
  } catch (err) {
    yield put(usersError(err));
  }
}

function* watchGetActiveUsers() {
  yield takeLatest(actionTypes.GET_ACTIVE_USERS, getActiveUsers);
}

function* getUserDetail(userId: string) {
  try {
    const data = yield api.getUserDetail(userId);
    yield put(getUserDetailSuccess(data));
  } catch (err) {
    yield put(usersError(err));
  }
}

function* watchGetUserDetail() {
  const action = yield take(actionTypes.GET_USER_DETAIL);
  yield call(getUserDetail, action.payload.userId);
}

function* addUser(action: any) {
  try {
    const user: User = action.payload.user;
    const data = yield call(api.addUser, user);
    if (typeof data == 'undefined'){
      yield put(checkMessageReturn(false));
    }else{
      yield put(checkMessageReturn(true));
    }
    yield call(getActiveUsers);
  } catch (err) {
    yield put(usersError(err));
  }
}

function* watchAddUser() {
  yield takeLatest(actionTypes.ADD_USER, addUser);
}

function* updateUser(action: any) {
  try {
    const user: User = action.payload.user;
    const userId: string = action.payload.userId;
    yield call(api.updateUser, userId, user);
    yield call(getUserDetail, userId);
  } catch (err) {
    yield put(usersError(err));
  }
}

function* watchUpdateUser() {
  yield takeLatest(actionTypes.UPDATE_USER, updateUser);
}

function* softDeleteUser(action: any) {
  try {
    const userId: string = action.payload.userId;
    // const data = yield api.getUserDetail(userId);
    // yield call(api.updateUser, userId, { ...data, isDeleted: true });
    yield call(api.deleteUser, userId);
    yield call(getActiveUsers);
  } catch (err) {
    yield put(usersError(err));
  }
}

function* watchSoftDeleteUser() {
  yield takeEvery(actionTypes.SOFT_DELETE_USER, softDeleteUser);
}

// function* deleteUser(userId: string) {
//   try {
//     yield call(api.deleteUser, userId);
//     yield call(getActiveUsers);
//   } catch (err) {
//     yield put(usersError(err));
//   }
// }

// function* watchDeleteUser() {
//   while (true) {
//     const action = yield take(actionTypes.DELETE_USER);
//     yield call(deleteUser, action.payload.userId);
//   }
// }

function* changeUserPassword(action: any){
  try{
    const oldPassword: string = action.payload.oldPassword;
    const newPassword: string = action.payload.newPassword;
    const messageReturn = yield call(api.changePassword, oldPassword, newPassword);
    yield put(checkMessageReturn(messageReturn));
    // yield call(getActiveUsers);

  }catch(err){
    yield put(usersError(err));
  }
}

function* watchChangeUserPassword() {
  yield takeLatest(actionTypes.CHANGE_USER_PASSWORD, changeUserPassword)
}

function* uploadRequestWatcherSaga() {
  yield takeEvery(actionTypes.UPLOAD_PHOTO_REQUEST, uploadFileSaga);
}

function* uploadFileSaga(action: any) {
  try {
    const userId: string = action.payload.userId;
    const file: File = action.payload.file;
    yield call(api.createUploadFileChannel, userId, file);
    yield call(getUserDetail, userId);
  } catch (err){
    yield put(usersError(err));
  }
}

export default [
  fork(watchGetAllUsers),
  fork(watchGetActiveUsers),
  fork(watchGetUserDetail),
  fork(watchAddUser),
  fork(watchUpdateUser),
  fork(watchSoftDeleteUser),
  // fork(watchDeleteUser),
  fork(watchChangeUserPassword),
  fork(uploadRequestWatcherSaga),
];
