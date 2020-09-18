import { ActionType } from 'global-constants';
import LoginService from 'services/login-service';

export const Login = ({username, password}) => (dispatch) => {
  dispatch({ type: ActionType.LOGIN_REQUEST });
  LoginService.login({username, password}).then(res => {
    LoginService.setToken(res.data.token);
    dispatch({
      type: ActionType.LOGIN_SUCCESS,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({ type: ActionType.LOGIN_FAILED });
  });
}

export const Logout = ()=> (dispatch) => {
  LoginService.setToken('');
  dispatch({ type: ActionType.LOG_OUT });
}
