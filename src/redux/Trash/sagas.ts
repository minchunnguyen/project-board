import { takeLatest, call, put, take, fork, takeEvery, select } from 'redux-saga/effects';

import { 
  actionTypes, 
  getTrashUsersSuccess, 
  getTrashProjectsSuccess, 
  getTrashTasksSuccess, 
  deleteTrashTask,
  hardDeleteProject,
  usersError } from './actions';

import api from './api';
// import userApi from '../Users/api';
import projectApi from '../Projects/api';
import User from '../../interfaces/User';

import taskApi from '../Tasks/api';
import Task from '../../interfaces/Task';

// Trash User
function* getTrashUsers() {
  try {
    const data: User[] = yield api.getTrashUser();
    // yield put(getTrashUsersSuccess(data.filter((user) => user.isDeleted === true)));
    yield put(getTrashUsersSuccess((data.filter((user) => user.isDeleted === true)).sort((a, b)=> (Number(a.id) - Number(b.id))))); 
  } catch (err) {
    yield put(usersError(err));
  }
};

function* watchGetTrashUsers() {
  yield takeEvery(actionTypes.GET_TRASH_USERS, getTrashUsers);
};

function* restoreUser(action: any) {
  try {
    const userId: string = action.payload.userId;
    // const data = yield userApi.getUserDetail(userId);
    // yield call(userApi.updateUser, userId, { ...data, isDeleted: false });
    yield call(api.restoreUser, userId);
    yield call(getTrashUsers);
  } catch (err) {
    yield put(usersError(err));
  }
};

function* watchRestoreUser() {
  yield takeLatest(actionTypes.RESTORE_USER, restoreUser);
};

function* deleteUser(userId: string) {
  try {
    yield call(api.hardDeleteUser, userId);
    yield call(getTrashUsers);
  } catch (err) {
    yield put(usersError(err));
  }
};

function* watchDeleteUser() {
  while (true) {
    const action = yield take(actionTypes.DELETE_USER);
    yield call(deleteUser, action.payload.userId);
  }
};

// Trash Project
function* getTrashProjects() {
  try {
    const data: User[] = yield projectApi.getProjectsData();
    yield put(getTrashProjectsSuccess(data.filter((project) => project.isDeleted === true)));
  } catch (err) {
    yield put(usersError(err));
  }
};

function* watchGetTrashProjects() {
  yield takeEvery(actionTypes.GET_TRASH_PROJECT, getTrashProjects);
};

function* restoreProject(action: any) {
  const projectId: string = action.payload.projectId;
  const project = action.payload.project;
  // const data = yield projectApi.getProjectDetail(projectId);
  const projectToUpdate = {
    id: Number(project.id),
    projectName: project.projectName,
    // user: project.user,
    description: project.description,
    startDate: new Date(project.startDate),
    endDate: new Date(project.endDate),
    status: "active",
    isDeleted: false,
  }
  yield call(projectApi.updateProject, projectId, projectToUpdate);
  yield call(getTrashProjects);
};

function* watchRestoreProject() {
  yield takeLatest(actionTypes.RESTORE_PROJECT, restoreProject);
};

function* hardDeleteTrashProject(args: any) {
  const projectId: string = args.payload.projectId;
  yield call(api.hardDeleteProject, projectId);
  yield call(getTrashProjects);
};

function* hardDeleteProjects() {
  let selectedProjectIds = yield select((state: any) => state.trash.selectedProjectIds);
  const trashProjectData = yield select((state: any) => state.trash.trashProjectData);
  if(selectedProjectIds.length == 0) {
    selectedProjectIds = trashProjectData.map((item: any) => {return item.id})
  }
  for (let i = 0; i < selectedProjectIds.length; i++) {
    yield put(hardDeleteProject(selectedProjectIds[i]));
  }
};

function* watchHardDeleteProject() {
  yield takeLatest(actionTypes.EMPTY_TRASH_PROJECT, hardDeleteProjects)
}

function* watchDeleteProject() {
  yield takeEvery(actionTypes.HARD_DELETE_PROJECT, hardDeleteTrashProject)
}

// Trash Task 
function* getTrashTasks() {
  try {
    const data: Task[] = yield taskApi.getTasksData();
    yield put(getTrashTasksSuccess(data.filter((task) => task.isDeleted === true)));
  } catch (err) {
    yield put(usersError(err));
  }
};

function* watchGetTrashTasks() {
  yield takeEvery(actionTypes.GET_TRASH_USERS, getTrashTasks);
};

function* restoreTask(action: any) {
  try {
    const taskId: string = action.payload.taskId;
    yield call(taskApi.deleteTask, taskId);
    yield call(getTrashTasks);
  } catch (err) {
    yield put(usersError(err));
  }
};

function* watchRestoreTask() {
  yield takeLatest(actionTypes.RESTORE_TASK, restoreTask);
};

function* deleteTaskSaga(args: any) {
  try {
    const taskId: string = args.payload.taskId;
    yield call(api.deleteTask, taskId);
    yield call(getTrashTasks);
  } catch (err) {
    yield put(usersError(err));
  }
}

function* deleteTasksSaga() {
  let selectedTaskIds = yield select((state: any) => state.trash.selectedTaskIds);
  // if(selectedTaskIds.length === 0){
  //   selectedTaskIds = yield select((state: any) => state.trash.trashProjectData.map(){});
  // }
  for (let i = 0; i < selectedTaskIds.length; i++) {
    yield put(deleteTrashTask(selectedTaskIds[i]));
  }
}

function* watchDeleteTasks() {
  yield takeEvery(actionTypes.DELETE_TRASH_TASKS, deleteTasksSaga)
}

function* watchDeleteTask() {
  yield takeEvery(actionTypes.DELETE_TRASH_TASK, deleteTaskSaga)
}

export default [
  fork(watchGetTrashUsers), 
  fork(watchRestoreUser), 
  fork(watchDeleteUser),
  fork(watchGetTrashProjects),
  fork(watchHardDeleteProject),
  fork(watchRestoreProject), 
  fork(watchGetTrashTasks),
  fork(watchRestoreTask),
  fork(watchDeleteTasks),
  fork(watchDeleteTask),
  fork(watchDeleteProject),
];
