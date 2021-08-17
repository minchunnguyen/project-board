import User from '../../interfaces/User';

export const actionTypes = {
  GET_ALL_USERS: 'GET_ALL_USERS',
  GET_ACTIVE_USERS: 'GET_ACTIVE_USERS',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USER_DETAIL: 'GET_USER_DETAIL',
  GET_USER_DETAIL_SUCCESS: 'GET_USER_DETAIL_SUCCESS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  SOFT_DELETE_USER: 'SOFT_DELETE_USER',
  DELETE_USER: 'DELETE_USER',
  ERROR: 'ERROR',
  SELECT_USER: 'SELECT_USER',
  SELECT_ALL_USER: 'SELECT_ALL_USER',
  DESELECT_USER: 'DESELECT_USER',
  RESET_SELECT_USER: 'RESET_SELECT_USER',
  CHANGE_USER_PASSWORD: 'CHANGE_USER_PASSWORD',
  CHECK_MESSAGE_RETURN: 'CHECK_MESSAGE_RETURN',
  CLOSE_POPUP_PASSWORD: 'CLOSE_POPUP_PASSWORD',

  UPLOAD_PHOTO_REQUEST:  'UPLOAD_REQUEST',
};

// HTTP Actions
export const getAllUsersRequest = () => ({
  type: actionTypes.GET_ALL_USERS,
});

export const getActiveUsersRequest = () => ({
  type: actionTypes.GET_ACTIVE_USERS,
});

export const getUsersSuccess = (data: any) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  payload: { data },
});

export const getUserDetailRequest = (userId: string) => ({
  type: actionTypes.GET_USER_DETAIL,
  payload: { userId },
});

export const getUserDetailSuccess = (data: any) => ({
  type: actionTypes.GET_USER_DETAIL_SUCCESS,
  payload: { data },
});

export const addUserRequest = (user: User) => ({
  type: actionTypes.ADD_USER,
  payload: { user },
});

export const updateUserRequest = (userId: string, user: User) => ({
  type: actionTypes.UPDATE_USER,
  payload: { userId, user },
});

export const softDeleteRequest = (userId: string) => ({
  type: actionTypes.SOFT_DELETE_USER,
  payload: { userId },
});

// export const deleteUserRequest = (userId: string) => ({
//   type: actionTypes.DELETE_USER,
//   payload: { userId },
// });

export const usersError = (error: any) => ({
  type: actionTypes.ERROR,
  payload: { error },
});

// Selection Actions
export const selectUser = (userId: string) => ({
  type: actionTypes.SELECT_USER,
  payload: { userId },
});

export const selectAllUser = (users: User[]) => ({
  type: actionTypes.SELECT_ALL_USER,
  payload: { users },
});

export const deselectUser = (userId: string) => ({
  type: actionTypes.DESELECT_USER,
  payload: { userId },
});

export const resetSelectUser = () => ({
  type: actionTypes.RESET_SELECT_USER,
});

export const changeUserPasswordRequest = (oldPassword: string, newPassword: string) => ({
  type: actionTypes.CHANGE_USER_PASSWORD,
  payload: { oldPassword, newPassword }
});

export const checkMessageReturn = (message: any) =>({
  type: actionTypes.CHECK_MESSAGE_RETURN,
  payload: {message}

});
export const closePopupPassword = () =>({
  type: actionTypes.CLOSE_POPUP_PASSWORD,

});
export const uploadPhotoRequest = (userId: string, file: any) => ({
  type: actionTypes.UPLOAD_PHOTO_REQUEST,
  payload: {userId, file},
});
