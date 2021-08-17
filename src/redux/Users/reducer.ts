import produce from 'immer';
import { actionTypes } from './actions';
import User from '../../interfaces/User';

const initialState = {
  userData: [],
  userDetail: null,
  selectedUserIds: [],
  error: null,
  message: null,
  openPopupPassword: false,
};

const successGetUserData = (draft: any, { data }: any) => {
  draft.userData = data;
};

const successGetUserDetailData = (draft: any, { data }: any) => {
  draft.userDetail = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};

const selectUser = (draft: any, { userId }: { userId: string }) => {
  draft.selectedUserIds = [...draft.selectedUserIds, userId];
};

const selectAllUser = (draft: any, { users }: { users: User[] }) => {
  draft.selectedUserIds = users.map(user => user.id);
};

const deselectUser = (draft: any, { userId }: { userId: string }) => {
  draft.selectedUserIds = draft.selectedUserIds.filter(
    (id: string) => id !== userId,
  );
};

const resetSelectUser = (draft: any) => {
  draft.selectedUserIds = [];
};
const checkMessage = (draft: any, message: any) => {
  draft.message = message;
  draft.openPopupPassword = true;
};

const closePopupPassword = (draft: any) => {
  draft.openPopupPassword = false;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.GET_USERS_SUCCESS:
        successGetUserData(draft, action.payload);
        break;
      case actionTypes.GET_USER_DETAIL_SUCCESS:
        successGetUserDetailData(draft, action.payload);
        break;
      case actionTypes.ERROR:
        failureLoadData(draft, action.payload);
        break;
      case actionTypes.SELECT_USER:
        selectUser(draft, action.payload);
        break;
      case actionTypes.SELECT_ALL_USER:
        selectAllUser(draft, action.payload);
        break;
      case actionTypes.DESELECT_USER:
        deselectUser(draft, action.payload);
        break;
      case actionTypes.RESET_SELECT_USER:
        resetSelectUser(draft);
        break;
      case actionTypes.CHECK_MESSAGE_RETURN:
        checkMessage(draft, action.payload);
        break;
      case actionTypes.CLOSE_POPUP_PASSWORD:
        closePopupPassword(draft);
        break;

    }
  });
};

export default reducer;
