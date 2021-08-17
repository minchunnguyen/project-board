import Task from "../../interfaces/Task";
import TaskModify from "../../interfaces/TaskModify";
export const actionTypes = {
  GET_ALL_TASKS: 'GET_ALL_TASKS',
  GET_ACTIVE_TASKS: 'GET_ACTIVE_TASKS',
  GET_TASKS_SUCCESS: 'GET_TASKS_SUCCESS',
  GET_TASKS_FAILURE: 'GET_TASKS_FAILURE',
  GET_TASK_DETAIL: "GET_TASK_DETAIL",
  GET_TASK_DETAIL_SUCCESS: "GET_TASK_DETAIL_SUCCESS",
  GET_TASK_DETAIL_FAILURE: "GET_TASK_DETAIL_FAILURE",
  INPUT_SEARCH_PLACE: 'INPUT_SEARCH_PLACE',
  ADD_TASK: "ADD_TASK",
  ASSIGN_TASK: "ASSIGN_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASKS: 'DELETE_TASKS',
  DELETE_TASK: 'DELETE_TASK',

  SELECT_TASK: 'SELECT_TASK',
  SELECT_ALL_TASK: 'SELECT_ALL_TASK',
  DESELECT_TASK: 'DESELECT_TASK',
  RESET_SELECT_TASK: 'RESET_SELECT_TASK',

  GET_PROJECT_MEMBERS: 'GET_PROJECT_MEMBERS',
  GET_PROJECT_MEMBERS_SUCCESS: 'GET_PROJECT_MEMBERS_SUCCESS',

  GET_TASKS_BY_PROJECT_ID: 'GET_TASKS_BY_PROJECT_ID',
  GET_TASKS_BY_PROJECT_ID_SUCCESS: 'GET_TASKS_BY_PROJECT_ID_SUCCESS',

  FILTER_TASKS_BY_STATUS: 'FILTER_TASKS_BY_STATUS',

  ERROR: 'ERROR',
};

export const getAllTasks = () => ({
  type: actionTypes.GET_ALL_TASKS,
});

export const getActiveTasks = () => ({
  type: actionTypes.GET_ACTIVE_TASKS,
});

export const getTasksSuccess = (data: any) => ({
  type: actionTypes.GET_TASKS_SUCCESS,
  payload: { data },
});

export const getTasksFailure = (error: any) =>({
    type: actionTypes.GET_TASKS_FAILURE,
    payload: {
      error,
    },
})

export const deleteTasks = () => ({
  type: actionTypes.DELETE_TASKS,
});

export const deleteTask = (taskId: string) => ({
  type: actionTypes.DELETE_TASK,
  payload: { taskId },
});

export const getTaskDetailRequest = (taskId: string) => ({
  type: actionTypes.GET_TASK_DETAIL,
  payload: { taskId },
});

export const getTaskDetailSuccess = (data: any) => ({
  type: actionTypes.GET_TASK_DETAIL_SUCCESS,
  payload: { data },
});

export const tasksError = (error: any) => ({
  type: actionTypes.ERROR,
  payload: { error },
});

// Selection Actions
export const selectTask = (taskId: string) => ({
  type: actionTypes.SELECT_TASK,
  payload: { taskId },
});

export const addTask = (task: TaskModify) => ({
  type: actionTypes.ADD_TASK,
  payload: {
    task,
  },
});
export const updateTask = (taskId: any, task: TaskModify) => ({
  type: actionTypes.UPDATE_TASK,
  payload: { taskId, task },
});

export const assignTask = (taskId: any, memberId: any) => ({
  type: actionTypes.ASSIGN_TASK,
  payload: { taskId, memberId },
});


export const selectAllTask = (tasks: Task[]) => ({
  type: actionTypes.SELECT_ALL_TASK,
  payload: { tasks },
});

export const deselectTask = (taskId: string) => ({
  type: actionTypes.DESELECT_TASK,
  payload: { taskId },
});

export const resetSelectTask = () => ({
  type: actionTypes.RESET_SELECT_TASK,
});

export const getProjectMembersRequest = (projectId: any) => ({
  type: actionTypes.GET_PROJECT_MEMBERS,
  payload: { projectId },
});

export const getProjectMembersSuccess = (data: any) => ({
  type: actionTypes.GET_PROJECT_MEMBERS_SUCCESS,
  payload: { data },
});

export const projectMembersError = (error: any) => ({
  type: actionTypes.ERROR,
  payload: { error },
});

export const getTasksByProjectIdRequest = (projectId: any) => ({
  type: actionTypes.GET_TASKS_BY_PROJECT_ID,
  payload: { projectId },
});

export const getTasksByProjectIdSuccess = (data: any) => ({
  type: actionTypes.GET_TASKS_BY_PROJECT_ID_SUCCESS,
  payload: { data },
});

export const filterTasksByStatus = (status: String) => ({
  type: actionTypes.FILTER_TASKS_BY_STATUS,
  payload: { status },
});

export function searchTask(searchStr: String) {
  return {
    type: actionTypes.INPUT_SEARCH_PLACE,
    payload: {searchStr}
  }
};
