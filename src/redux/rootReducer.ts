import { combineReducers } from 'redux';

import authenticationReducer from './Authentication/reducer';
import usersReducer from './Users/reducer';
import projectsReducer from './Projects/reducer';
import tasksReducer from './Tasks/reducer';
import trashReducer from './Trash/reducer';

const rootReducer = combineReducers({
  users : usersReducer,
  authentication: authenticationReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  trash: trashReducer
})

export default rootReducer;