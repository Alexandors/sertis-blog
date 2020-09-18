import { ActionType } from 'global-constants';
import LoginService from 'services/login-service';

export const Login = ({username, password}) => (dispatch) => {
  dispatch({ type: ActionType.LOGIN_REQUEST });
  LoginService.login({username, password}).then(res => {
    dispatch({
      type: ActionType.LOGIN_SUCCESS,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({ type: ActionType.LOGIN_FAILED });
  });
}
