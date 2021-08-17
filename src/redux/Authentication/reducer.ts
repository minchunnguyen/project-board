import produce from "immer";
import { actionTypes } from "./actions";
import JwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const initialState = {
  accessToken: null,
  currentAccountId: null,
  currentAccountUserName: null,
  currentAccountRole: null,
  error: null,
  message: null,
};

const successLogIn = (draft: any, { data }: any) => {
  draft.error = null;
  draft.message = null;
  draft.accessToken = data.access_token;

  const decoded: any = JwtDecode(data.access_token);
  draft.currentAccountId = decoded.id;
  draft.currentAccountUserName = decoded.username;
  draft.currentAccountRole = decoded.role;
};

const logOut = (draft: any) => {
  draft.error = null;
  draft.message = null;
  draft.accessToken = null;
  draft.currentAccountId = null;
  draft.currentAccountUserName = null;
  draft.currentAccountRole = null;

  Cookies.remove('refresh_token');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token_expire_time');
};

const successRegister = (draft: any, { data }: any) => {
  if (data) {
    draft.message = 'Register Successfuly';
    draft.error = null;
  }
};

const successRefreshToken = (draft: any, data: any) => {
  draft.accessToken = data.access_token;

  const decoded: any = JwtDecode(data.access_token);
  draft.currentAccountId = decoded.id;
  draft.currentAccountUserName = decoded.username;
  draft.currentAccountRole = decoded.role;

  sessionStorage.setItem('access_token', data.access_token);
  sessionStorage.setItem('access_token_expire_time', (Date.now() + 30 * 60 * 1000).toString());

  if (data.refresh_token) {
    Cookies.set('refresh_token', data.refresh_token, {
      expires: 1
    });
  }
};

const failureLoadData = (draft: any, { response }: any) => {
  draft.message = null;
  draft.error = response.data.message;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOG_IN_SUCCESS:
        successLogIn(draft, action.payload.data);
        break;
      case actionTypes.LOG_OUT:
        logOut(draft);
        break;
      case actionTypes.REGISTER_SUCCESS:
        successRegister(draft, action.payload.data);
        break;
      case actionTypes.REFRESH_TOKEN_SUCCESS:
        successRefreshToken(draft, action.payload.data);
        break;
      case actionTypes.ERROR:
        failureLoadData(draft, action.payload.error);
        logOut(draft);
        break;
    }
  });
};

export default reducer;
