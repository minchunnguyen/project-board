import User from "../../interfaces/User";
import Task from '../../interfaces/Task';

export const actionTypes = {
  ERROR: 'ERROR',

  GET_TRASH_USERS: 'GET_TRASH_USERS',
  GET_TRASH_USERS_SUCCESS: 'GET_TRASH_USERS_SUCCESS',
  RESTORE_USER: 'RESTORE_USER',
  DELETE_USER: 'DELETE_USER',
  SELECT_TRASH_USER: 'SELECT_TRASH_USER',
  DESELECT_TRASH_USER: 'DESELECT_TRASH_USER',
  RESET_SELECT_TRASH_USER: 'RESET_SELECT_TRASH_USER',
  SELECT_ALL_TRASH_USER: 'SELECT_ALL_TRASH_USER', 

  GET_TRASH_PROJECT: 'GET_TRASH_PROJECT',
  GET_TRASH_PROJECT_SUCCESS: 'GET_TRASH_PROJECT_SUCCESS',
  SELECT_TRASH_PROJECT: 'SELECT_TRASH_PROJECT',
  DESELECT_TRASH_PROJECT: 'DESELECT_TRASH_PROJECT',
  RESET_SELECT_TRASH_PROJECT: 'RESET_SELECT_TRASH_PROJECT',
  HARD_DELETE_PROJECT: 'HARD_DELETE_PROJECT',
  DELETE_TRASH_PROJECTS: 'DELETE_TRASH_PROJECTS',
  RESTORE_PROJECT: 'RESTORE_PROJECT',
  EMPTY_TRASH_PROJECT: 'EMPTY_TRASH_PROJECT',

  GET_TRASH_TASKS: 'GET_TRASH_TASKS',
  GET_TRASH_TASKS_SUCCESS: 'GET_TRASH_TASKS_SUCCESS',
  DELETE_TRASH_TASKS: 'DELETE_TRASH_TASKS',
  DELETE_TRASH_TASK: 'DELETE_TRASH_TASK',
  RESTORE_TASK: 'RESTORE_TASK',
  SELECT_TRASH_TASK: 'SELECT_TRASH_TASK',
  SELECT_ALL_TRASH_TASKS: 'SELECT_ALL_TRASH_TASKS',
  DESELECT_TRASH_TASK: 'DESELECT_TRASH_TASK',
  RESET_SELECT_TRASH_TASK: 'RESET_SELECT_TRASH_TASK',
  CHANGE_TRASH_CONTEXT: 'CHANGE_TRASH_CONTEXT',
};

// Trash User Action
export const getTrashUsersRequest = () => ({
  type: actionTypes.GET_TRASH_USERS,
});

export const getTrashUsersSuccess = (data: any) => ({
  type: actionTypes.GET_TRASH_USERS_SUCCESS,
  payload: { data },
});

export const restoreProjectRequest = (projectId: string, project: any) => ({
  type: actionTypes.RESTORE_PROJECT,
  payload: { projectId, project },
});

export const restoreUserRequest = (userId: string) => ({
  type: actionTypes.RESTORE_USER,
  payload: { userId },
});

export const deleteUserRequest = (userId: string) => ({
  type: actionTypes.DELETE_USER,
  payload: { userId },
});

export const usersError = (error: any) => ({
  type: actionTypes.ERROR,
  payload: { error },
});

export const selectUser = (userId: string) => ({
  type: actionTypes.SELECT_TRASH_USER,
  payload: { userId },
});

export const deselectUser = (userId: string) => ({
  type: actionTypes.DESELECT_TRASH_USER,
  payload: { userId },
});

export const resetSelectUser = () => ({
  type: actionTypes.RESET_SELECT_TRASH_USER,
});

export const selectAllTrashUser = (users: User[]) => ({
  type: actionTypes.SELECT_ALL_TRASH_USER,
  payload: { users },
});
// Trash Project Action
export const getTrashProjectRequest = () => ({
  type: actionTypes.GET_TRASH_PROJECT,
});

export const getTrashProjectsSuccess = (data: any) => ({
  type: actionTypes.GET_TRASH_PROJECT_SUCCESS,
  payload: { data },
});

export const selectProject = (projectId: string) => ({
  type: actionTypes.SELECT_TRASH_PROJECT,
  payload: { projectId },
});

export const deselectProject = (projectId: string) => ({
  type: actionTypes.DESELECT_TRASH_PROJECT,
  payload: { projectId },
});

export const resetSelectProject = () => ({
  type: actionTypes.RESET_SELECT_TRASH_PROJECT,
});

// Trash Task Action
export const getTrashTasksRequest = () => ({
  type: actionTypes.GET_TRASH_TASKS,
});

export const getTrashTasksSuccess = (data: any) => ({
  type: actionTypes.GET_TRASH_TASKS_SUCCESS,
  payload: { data },
});

export const deleteTrashTasks = () => ({
  type: actionTypes.DELETE_TRASH_TASKS,
});

export const deleteTrashTask = (taskId: string) => ({
  type: actionTypes.DELETE_TRASH_TASK,
  payload: { taskId },
});

export const restoreTaskRequest = (taskId: string) => ({
  type: actionTypes.RESTORE_TASK,
  payload: { taskId },
});

export const selectTask = (taskId: string) => ({
  type: actionTypes.SELECT_TRASH_TASK,
  payload: { taskId },
});

export const selectAllTask = (tasks: Task[]) => ({
  type: actionTypes.SELECT_ALL_TRASH_TASKS,
  payload: { tasks },
});

export const deselectTask = (taskId: string) => ({
  type: actionTypes.DESELECT_TRASH_TASK,
  payload: { taskId },
});

export const resetSelectTask = () => ({
  type: actionTypes.RESET_SELECT_TRASH_TASK,
});

export const changeContext = (trashContext: string) => ({
  type: actionTypes.CHANGE_TRASH_CONTEXT,
  payload: { trashContext },
});

export const emptyTrashProject = () => ({
  type: actionTypes.EMPTY_TRASH_PROJECT,
});

export const hardDeleteProject = (projectId: string) => ({
  type: actionTypes.HARD_DELETE_PROJECT,
  payload: { projectId },
});
