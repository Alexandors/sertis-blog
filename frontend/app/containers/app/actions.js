import UserService from 'services/user-service';
import { ActionType } from 'global-constants';

export const fetchCurrentUser = () => (dispatch) => {
  UserService.getCurrentUser().then(res => {
    dispatch({
      type: ActionType.FETCH_CURRENT_USER_SUCCESS,
      payload: res.data
    });
  });
}
