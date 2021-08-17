import Project from "../../interfaces/Project";

export const actionTypes = {
  GET_PROJECT: 'GET_PROJECT',
  GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',
  GET_PROJECT_FAILURE: 'GET_PROJECT_FAILURE',
  SOFT_DELETE_PROJECT: 'SOFT_DELETE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  ADD_PROJECT_TO_DELETE: 'ADD_PROJECT_TO_DELETE',
  DESELECT_PROJECT_TO_DELETE: 'DESELECT_PROJECT_TO_DELETE',
  DELETE_MULTI_PROJECT: 'DELETE_MULTI_PROJECT',
  CHANGE_DATE_FILLTER: 'CHANGE_DATE_FILLTER',
  INPUT_SEARCH_PLACE: 'INPUT_SEARCH_PLACE',
  ADD_PROJECT:'ADD_PROJECT',
  TOGGLE_ALL_PROJECT: 'TOGGLE_ALL_PROJECT',
  GET_SELECTED_PROJECT: 'GET_SELECTED_PROJECT',
  GET_SELECTED_PROJECT_SUCCESS: 'GET_SELECTED_PROJECT_SUCCESS',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  GET_MANAGER_LIST: 'GET_MANAGER_LIST',
  GET_MANAGER_LIST_SUCCESS: 'GET_MANAGER_LIST_SUCCESS',
  ASSIGN_PROJECT_MANAGER: 'ASSIGN_PROJECT_MANAGER'
};

export function getProjects() {
  return {
    type: actionTypes.GET_PROJECT
  };
}

export function getProjectsSuccess(data: any) {
  return {
    type: actionTypes.GET_PROJECT_SUCCESS,
    payload: {
      data: data
    }
  };
}

export const getSelectedProRequest = (projectId: string) => ({
  type: actionTypes.GET_SELECTED_PROJECT,
  payload: { projectId },
});

export const getSelectedProSuccess = (data: any) => ({
  type: actionTypes.GET_SELECTED_PROJECT_SUCCESS,
  payload: { data },
}); 

export const getManagerList = () => ({
  type: actionTypes.GET_MANAGER_LIST,
});

export const getManagerListSuccess = (data: any) => ({
  type: actionTypes.GET_MANAGER_LIST_SUCCESS,
  payload: { data },
}); 

export function getProjectsFailure(error: any) {
  return {
    type: actionTypes.GET_PROJECT_FAILURE,
    payload: {
      error: error
    }
  }
}

export function addProject(project: Project){
  return{
    type: actionTypes.ADD_PROJECT,
    payload:{
      project: project
    }
  }
}	

export function deleteProject (projectId: number) {
  return{
    type: actionTypes.DELETE_PROJECT,
    payload: {projectId}
  }
};

export function deleteMultiProject (projectIds: Array<number>) {
  return{
    type: actionTypes.DELETE_MULTI_PROJECT,
    payload: {projectIds}
  }
};

export function addProject2Delete(projectId: number) {
  return {
    type: actionTypes.ADD_PROJECT_TO_DELETE,
    payload: {projectId}
  }
};

export function deSelectProject(projectId: number) {
  return {
    type: actionTypes.DESELECT_PROJECT_TO_DELETE,
    payload: {projectId}
  }
};

export function changeDateFillter(condition: Array<number>) {
  return {
    type: actionTypes.CHANGE_DATE_FILLTER,
    payload: {condition}
  }
};

export function searchProject(searchStr: String) {
  return {
    type: actionTypes.INPUT_SEARCH_PLACE,
    payload: {searchStr}
  }
};

export const softDeleteRequest = (projectId: string) => ({
  type: actionTypes.SOFT_DELETE_PROJECT,
  payload: { projectId },
});

export const toggleAllProject = (projects: Project[]) => ({
  type: actionTypes.TOGGLE_ALL_PROJECT,
  payload: { projects },
});

export const updateProject = (projectId: number, project: any) => ({
  type: actionTypes.UPDATE_PROJECT,
  payload: { projectId, project },
});

export const assignProjectManager = (projectId: string, managerId: string) => ({
  type: actionTypes.ASSIGN_PROJECT_MANAGER,
  payload: { projectId, managerId },
});