import { call, put, fork, take, takeEvery , takeLatest} from "redux-saga/effects";

import {
  actionTypes,
  getProjectsSuccess,
  getProjectsFailure,
  getSelectedProSuccess,
  getManagerListSuccess
} from "./actions";

import api from "./api";
import Project from "../../interfaces/Project";

function* loadDataSaga() {
  try {
    const data = yield api.getProjectsData();
    yield put(getProjectsSuccess(data.filter((project : any) => project.isDeleted === false)));
  } catch (err) {
    yield put(getProjectsFailure(err));
  }
}

function* softDeleteProject(action: any) {
  try {
    const projectId: string = action.payload.projectId;
    yield call(api.deleteProject, parseInt(projectId));
    yield call(loadDataSaga);
  } catch (err) {
    
  }
}

function* getProjectDetail(projectId: string) {
  const data = yield api.getProjectDetail(projectId);
  yield put(getSelectedProSuccess(data));
}

function* watchGetProjectDetail() {
  const action = yield take(actionTypes.GET_SELECTED_PROJECT);
  yield call(getProjectDetail, action.payload.projectId);
}

function* getManagerList() {
  const data = yield api.getManagerList();
  yield put(getManagerListSuccess(data.filter((manager : any) => manager.isDeleted === false)));
}

function* watchGetManagerList() {
  yield take(actionTypes.GET_MANAGER_LIST);
  yield call(getManagerList)
}

function* watchSoftDeleteProject() {
  yield takeEvery(actionTypes.SOFT_DELETE_PROJECT, softDeleteProject);
}

function* deleteProject(projectId : number){
  yield call(api.deleteProject, projectId);
  yield call(loadDataSaga);
}

function* watchGetProjectsData() {
  yield takeLatest(actionTypes.GET_PROJECT, loadDataSaga);
}

function* watchDeleteProject() {
  while(true){
    const action = yield take(actionTypes.DELETE_PROJECT);
    yield call(deleteProject, action.payload.projectId);
  }
}
function* addProject(project : Project){
  yield call(api.addProject, project);
  yield call(loadDataSaga);
}

function* watchAddProject() {
  while(true){
    const action = yield take(actionTypes.ADD_PROJECT);
    yield call(addProject, action.payload.project);
  }
}

function* updateProject(action: any) {
    const project: Project = action.payload.project;
    const projectId: string = action.payload.projectId;
    yield call(api.updateProject, projectId, project);
}

function* watchUpdateProject() {
  yield takeLatest(actionTypes.UPDATE_PROJECT, updateProject);
}

function* watchAssignProjectManager() {
  yield takeLatest(actionTypes.ASSIGN_PROJECT_MANAGER, assignProjectManager);
}

function* assignProjectManager(action: any) {
    const projectId: string = action.payload.projectId;
    const managerId: string = action.payload.managerId;
    yield call(api.assignProject, projectId, managerId);
}
const sagas = [
  fork(watchDeleteProject), 
  fork(watchGetProjectsData), 
  fork(watchSoftDeleteProject), 
  fork(watchAddProject), 
  fork(watchGetProjectDetail),
  fork(watchUpdateProject),
  fork(watchGetManagerList),
  fork(watchAssignProjectManager),
];

export default sagas;
