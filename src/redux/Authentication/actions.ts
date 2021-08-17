export const actionTypes = {
  LOG_IN: "LOG_IN",
  LOG_IN_SUCCESS: "LOG_IN_SUCCESS",

  LOG_OUT: "LOG_OUT",

  REGISTER: "REGISTER",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",

  REFRESH_TOKEN: 'REFRESH_TOKEN',
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',

  ERROR: 'ERROR',
};

export const logIn = (data: any) => ({
  type: actionTypes.LOG_IN,
  payload: { data },
});

export const logInSuccess = (data: any) => ({
  type: actionTypes.LOG_IN_SUCCESS,
  payload: { data },
});

export const logOut = () => ({
  type: actionTypes.LOG_OUT,
});

export const register = (data: any) => ({
  type: actionTypes.REGISTER,
  payload: { data },
});

export const registerSuccess = (data: any) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: { data },
});

export const refreshToken = (data: any) => ({
  type: actionTypes.REFRESH_TOKEN,
  payload: { data },
});

export const refreshTokenSuccess = (data: any) => ({
  type: actionTypes.REFRESH_TOKEN_SUCCESS,
  payload: { data },
});

export const authenticationError = (error: any) => ({
  type: actionTypes.ERROR,
  payload: { error },
});