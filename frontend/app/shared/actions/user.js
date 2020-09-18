import UserService from 'services/user-service';
import { ActionType } from 'global-constants';
import { showServerError } from './notification';

export const getUserById = (id) => (dispatch) => {
  UserService.getUserById(id).then((res) => {
    dispatch({
      type: ActionType.GET_USER_BY_ID_SUCCESS,
      payload: res.data,
    });
  }).catch((err) => {
    dispatch({ type: ActionType.SERVER_ERROR });
    dispatch(showServerError(err));
  });
};
