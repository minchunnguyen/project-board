import { put, call, take, fork, select, takeEvery, takeLatest } from "redux-saga/effects";

import {
  actionTypes,
  getTasksSuccess,
  getTaskDetailSuccess,
  deleteTask,
  tasksError,
  getProjectMembersSuccess,
  projectMembersError,
  getTasksByProjectIdSuccess,
} from "./actions";

import api from "./api";
import Task from "../../interfaces/Task";
import User from "../../interfaces/User";

function* getAllTasks() {
  try {
    const data = yield api.getTasksData();
    yield put(getTasksSuccess(data));
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchGetAllTasks() {
  yield takeLatest(actionTypes.GET_ALL_TASKS, getAllTasks);
}

function* getActiveTasks() {
  try {
    const data: Task[] = yield api.getTasksData();
    yield put(getTasksSuccess(data.filter((task) => task.isDeleted === false)));
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchGetActiveTasks() {
  yield takeLatest(actionTypes.GET_ACTIVE_TASKS, getActiveTasks);
}

function* getTaskDetail(taskId: string) {
  try {
    const data = yield api.getTaskDetail(taskId);
    yield put(getTaskDetailSuccess(data));
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchGetTaskDetail() {
  const action = yield take(actionTypes.GET_TASK_DETAIL);
  yield call(getTaskDetail, action.payload.taskId);
}

function* addTask(action: any) {
  try {
    const task: Task = action.payload.task;
    yield call(api.addTask, task);
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* deleteTaskSaga(args: any) {
  try {
    const taskId: string = args.payload.taskId;
    yield call(api.deleteTask, taskId);
    yield call(getActiveTasks);
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchAddTask() {
  yield takeLatest(actionTypes.ADD_TASK, addTask);
}

function* updateTask(action: any) {
  try {
    const task: Task = action.payload.task;
    const taskId: string = action.payload.taskId;
    yield call(api.updateTask, taskId, task);
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchUpdateTask() {
  yield takeLatest(actionTypes.UPDATE_TASK, updateTask);
}

function* assignTask(action: any) {
  try {
    const taskId: string = action.payload.taskId;
    const memberId: string = action.payload.memberId;
    yield call(api.assignTask, taskId, memberId);
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchAssignTask() {
  yield takeLatest(actionTypes.ASSIGN_TASK, assignTask);
}


function* deleteTasksSaga() {
  const selectedTaskIds = yield select((state: any) => state.tasks.selectedTaskIds);
  for (let i = 0; i < selectedTaskIds.length; i++) {
    yield put(deleteTask(selectedTaskIds[i]));
  }
}

function* watchDeleteTasks() {
  yield takeLatest(actionTypes.DELETE_TASKS, deleteTasksSaga)
}

function* watchDeleteTask() {
  yield takeEvery(actionTypes.DELETE_TASK, deleteTaskSaga)
}

function* getProjectMembers() {
  try {
    const data: User[] = yield api.getProjectMembersData();
    yield put(getProjectMembersSuccess(data));
  } catch (err) {
    yield put(projectMembersError(err));
  }
}

function* watchGetProjectMembers() {
  yield take(actionTypes.GET_PROJECT_MEMBERS);
  yield call(getProjectMembers);
}

// function* getMembers() {
//   try {
//     const data: User[] = yield api.getMembersData();
//     yield put(getProjectMembersSuccess(data));
//   } catch (err) {
//     yield put(projectMembersError(err));
//   }
// }

// function* watchGetMembers() {
//   yield take(actionTypes.GET_PROJECT_MEMBERS);
//   yield call(getMembers);
// }
function* getTasksByProjectId(id: string) {
  try {
    const data: Task[] = yield api.getTasksByProjectId(id);
    yield put(getTasksByProjectIdSuccess(data));
  } catch (err) {
    yield put(tasksError(err));
  }
}

function* watchGetTasksByProjectId() {
  while(true){
    const action = yield take(actionTypes.GET_TASKS_BY_PROJECT_ID);
    yield call(getTasksByProjectId, action.payload.projectId);
  }
}


export default [
  fork(watchGetAllTasks),
  fork(watchGetActiveTasks),
  fork(watchGetTaskDetail),
  fork(watchAddTask),
  fork(watchUpdateTask),
  fork(watchDeleteTasks),
  fork(watchDeleteTask),
  fork(watchGetProjectMembers),
  fork(watchAssignTask),
  fork(watchGetTasksByProjectId)
];
