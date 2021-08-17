import produce from "immer";

import { actionTypes } from './actions';

const initialState = {
  selectedProject: null,
  projectData: [],
  item2Delete: [],
  dateFillter: [],
  managerList: [],
  searchStr: null,
  error: null
};

const successLoadData = (draft: any, { data }: any) => {
  draft.projectData = data;
  draft.dateFillter = [0,0];
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.projectData = error;
};

const selectProject = (draft: any, projectId: any) => {
  draft.item2Delete = [...draft.item2Delete, projectId];
};

const deSelectProject = (draft: any, projectId: any) => {
  draft.item2Delete = draft.item2Delete.filter(
    (id: number) => id !== projectId,
  );
};

const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.GET_PROJECT_SUCCESS:
        successLoadData(draft, action.payload);
        break;
      case actionTypes.GET_PROJECT_FAILURE:
        failureLoadData(draft, action.payload);
        break;
      case actionTypes.ADD_PROJECT_TO_DELETE:
        selectProject(draft, parseInt(action.payload.projectId));
        break;
      case actionTypes.DESELECT_PROJECT_TO_DELETE:
        deSelectProject(draft, parseInt(action.payload.projectId));
        break;
      case actionTypes.CHANGE_DATE_FILLTER:
        draft.dateFillter = action.payload.condition;
        break;
      case actionTypes.INPUT_SEARCH_PLACE:
        draft.searchStr = action.payload.searchStr;
        break;
      case actionTypes.GET_SELECTED_PROJECT_SUCCESS:
        draft.selectedProject = action.payload.data[0];
        break;
      case actionTypes.GET_MANAGER_LIST_SUCCESS:
        draft.managerList = action.payload.data;
        break;
      case actionTypes.TOGGLE_ALL_PROJECT:
        draft.item2Delete = action.payload.projects.map((project: any)  => parseInt(project.id));
        break;
    }
  });
};

export default reducer;
