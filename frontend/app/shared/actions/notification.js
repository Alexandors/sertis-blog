import { ActionType } from 'global-constants';
import { NotificationLevel } from 'shared/constants/notification';

export const showSuccessMessage = (text) => (dispatch) => {
  dispatch({
    type: ActionType.SHOW_NOTIFICATION,
    payload: {
      level: NotificationLevel.SUCCESS,
      message: text,
    },
  });
};

export const showErrorMessage = (text, autoDismiss = 0) => (dispatch) => {
  dispatch({
    type: ActionType.SHOW_NOTIFICATION,
    payload: {
      level: NotificationLevel.ERROR,
      message: text,
      autoDismiss,
    },
  });
};

export const showWarningMessage = (text) => (dispatch) => {
  dispatch({
    type: ActionType.SHOW_NOTIFICATION,
    payload: {
      level: NotificationLevel.WARNING,
      message: text,
      autoDismiss: 10,
    },
  });
};

export const showServerError = (error, message = null, autoDismiss = null) => (dispatch) => {
  dispatch({
    type: ActionType.SHOW_NOTIFICATION,
    payload: {
      error,
      message,
      autoDismiss,
    },
  });
};

export const clearNotification = () => (dispatch) => {
  dispatch({
    type: ActionType.CLEAR_NOTIFICATION_MESSAGE,
  });
};
