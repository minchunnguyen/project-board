import produce from "immer";
import Task from "../../interfaces/Task";
import { actionTypes } from "./actions";

const initialState = {
  taskData: [],
  taskDetail: null,
  selectedTaskIds: [],
  error: null,
  projectMembersData: [],
  tasksDashboardData: [],
  statusFillter: "non",
  searchStr: null,
};

const successGetTaskData = (draft: any, { data }: any) => {
  draft.taskData = data;
};

const successGetProjectMembersData = (draft: any, { data }: any) => {
  draft.projectMembersData = data;
};

const successGetTaskDetailData = (draft: any, { data }: any) => {
  draft.taskDetail = data;
};

const selectTask = (draft: any, { taskId }: any) => {
  draft.selectedTaskIds = [...draft.selectedTaskIds, taskId];
};

const selectAllTask = (draft: any, { tasks }: { tasks: Task[] }) => {
  draft.selectedTaskIds = tasks.map((task) => task.id);
};

const deselectTask = (draft: any, { taskId }: any) => {
  draft.selectedTaskIds = draft.selectedTaskIds.filter(
    (id: string) => id !== taskId
  );
};

const resetSelectTask = (draft: any) => {
  draft.selectedTaskIds = [];
};

// get success Task by Project
const getSuccessTasksDashboard = (draft: any, { data }: any) => {
  draft.tasksDashboardData = data;
  draft.taskData = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.GET_TASKS_SUCCESS:
        successGetTaskData(draft, action.payload);
        break;
      case actionTypes.GET_TASK_DETAIL_SUCCESS:
        successGetTaskDetailData(draft, action.payload);
        break;
      case actionTypes.GET_PROJECT_MEMBERS_SUCCESS:
        successGetProjectMembersData(draft, action.payload);
        break;
      case actionTypes.SELECT_TASK:
        selectTask(draft, action.payload);
        break;
      case actionTypes.SELECT_ALL_TASK:
        selectAllTask(draft, action.payload);
        break;
      case actionTypes.DESELECT_TASK:
        deselectTask(draft, action.payload);
        break;
      case actionTypes.RESET_SELECT_TASK:
        resetSelectTask(draft);
        break;
      case actionTypes.GET_TASKS_BY_PROJECT_ID_SUCCESS:
        getSuccessTasksDashboard(draft, action.payload);
        break;
      case actionTypes.FILTER_TASKS_BY_STATUS:
        draft.statusFillter = action.payload.status;
        break;
      case actionTypes.INPUT_SEARCH_PLACE:
        draft.searchStr = action.payload.searchStr;
        break;
      case actionTypes.ERROR:
        failureLoadData(draft, action.payload);
    }
  });
};

export default reducer;
