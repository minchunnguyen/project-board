import produce from 'immer';
import { actionTypes } from './actions';
import User from '../../interfaces/User';
import Task from '../../interfaces/Task';

const initialState = {
  trashContext: 'tasksTab',
  trashUserData: [],
  trashTaskData: [],
  trashProjectData: [],
  selectedTrashUserIds: [],
  selectedProjectIds: [],
  selectedTaskIds: [],
  error: null,
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};

// Trash User
const successGetUserData = (draft: any, { data }: any) => {
  draft.trashUserData = data;
};

const selectUser = (draft: any, { userId }: { userId: string }) => {
  draft.selectedTrashUserIds = [...draft.selectedTrashUserIds, userId];
};

const deselectUser = (draft: any, { userId }: { userId: string }) => {
  draft.selectedTrashUserIds = draft.selectedTrashUserIds.filter(
    (id: string) => id !== userId,
  );
};

const resetSelectUser = (draft: any) => {
  draft.selectedTrashUserIds = [];
}

const selectAllTrashUser = (draft: any, { users }: { users: User[] }) => {
  draft.selectedTrashUserIds = users.map(user => user.id);
};

// Trash Project
const successGetProjectData = (draft: any, { data }: any) => {
  draft.trashProjectData = data;
};

const selectProject = (draft: any, { projectId }: { projectId: string }) => {
  draft.selectedProjectIds = [...draft.selectedProjectIds, projectId];
};

const deselectProject = (draft: any, { projectId }: { projectId: string }) => {
  draft.selectedProjectIds = draft.selectedProjectIds.filter(
    (id: string) => id !== projectId,
  );
};

const resetSelectProject = (draft: any) => {
  draft.selectedProjectIds = [];
}

// Trash Task
const successGetTaskData = (draft: any, { data }: any) => {
  draft.trashTaskData = data;
};

const selectTask = (draft: any, { taskId }: any) => {
  draft.selectedTaskIds = [...draft.selectedTaskIds, taskId];
};

const selectAllTask = (draft: any, { tasks }: { tasks: Task[] }) => {
  draft.selectedTaskIds = tasks.map(task => task.id);
};

const deselectTask = (draft: any, { taskId }: any) => {
  draft.selectedTaskIds = draft.selectedTaskIds.filter((id: string) => id !== taskId);
};

const resetSelectTask = (draft: any) => {
  draft.selectedTaskIds = [];
};

// Reducer
const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.ERROR:
        failureLoadData(draft, action.payload);
        break;
      // Trash User
      case actionTypes.GET_TRASH_USERS_SUCCESS:
        successGetUserData(draft, action.payload);
        break;
      case actionTypes.SELECT_TRASH_USER:
        selectUser(draft, action.payload);
        break;
      case actionTypes.DESELECT_TRASH_USER:
        deselectUser(draft, action.payload);
        break;
      case actionTypes.RESET_SELECT_TRASH_USER:
        resetSelectUser(draft);
        break;
      case actionTypes.SELECT_ALL_TRASH_USER:
        selectAllTrashUser(draft, action.payload);
        break;
      // Trash Project
      case actionTypes.GET_TRASH_PROJECT_SUCCESS:
        successGetProjectData(draft, action.payload);
        break;
      case actionTypes.SELECT_TRASH_PROJECT:
        selectProject(draft, action.payload);
        break;
      case actionTypes.DESELECT_TRASH_PROJECT:
        deselectProject(draft, action.payload);
        break;
      case actionTypes.RESET_SELECT_TRASH_PROJECT:
        resetSelectProject(draft);
        break;
      // Trash Task
      case actionTypes.GET_TRASH_TASKS_SUCCESS:
        successGetTaskData(draft, action.payload);
        break;
      case actionTypes.SELECT_ALL_TRASH_TASKS:
        selectAllTask(draft, action.payload);
        break;
      case actionTypes.SELECT_TRASH_TASK:
        selectTask(draft, action.payload);
        break;
      case actionTypes.DESELECT_TRASH_TASK:
        deselectTask(draft, action.payload);
        break;
      case actionTypes.RESET_SELECT_TRASH_TASK:
        resetSelectTask(draft);
        break;
      case actionTypes.CHANGE_TRASH_CONTEXT:
        draft.trashContext = action.payload.trashContext;
        draft.selectedTrashUserIds = [];
        draft.selectedProjectIds = [];
        draft.selectedTaskIds = [];
        break;
    }
  });
};

export default reducer;
