import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import NotificationSystem from 'react-notification-system';
import { NotificationLevel } from 'shared/constants/notification';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationMessages } from 'shared/selectors/notification';
import { clearNotification } from 'shared/actions/notification';

export const FIVE_SECOND = 5;
export const TEN_SECOND = 10;
const getErrorResponse = (intl, errorResponse, message) => {
  const errorMessage = {
    title: "Error",
    level: NotificationLevel.ERROR,
    autoDismiss: 0,
  };

  switch (errorResponse.status) {
    case 500: {
      errorMessage.message = "Server Unavailable";
      break;
    }
    case 401: {
      errorMessage.message = "Invalid Login"
      break;
    }
    case 404: {
      errorMessage.message = "Not Found"
      break;
    }
    default: {
      errorMessage.message = "Error"
    }
  }

  errorMessage.message = `${errorResponse.status}: ${errorMessage.message}`;

  if (_.isString(message.message)) {
    errorMessage.message = `${message.message} ${errorMessage.message}`;
  }
  const dataMessage = _.get(errorResponse, ['data', 'message']);
  if (_.isString(dataMessage) && dataMessage !== 'No message available') {
    errorMessage.message = `${errorMessage.message} ${dataMessage}`;
  }
  return errorMessage;
};
const getMessage = (intl, message) => {
  const errorResponse = _.get(message, ['error', 'response']);
  if (!_.isNil(errorResponse)) {
    return getErrorResponse(intl, errorResponse, message);
  }

  const error = _.get(message, ['error']);
  if (!_.isNil(error)) {
    return {
      title: "Error",
      level: NotificationLevel.ERROR,
      message: error.message,
      autoDismiss: TEN_SECOND,
    };
  }
  return message;
};

const Notification = ({ intl }) => {
  const dispatch = useDispatch();
  const notificationMessages = useSelector(getNotificationMessages);
  const notificationInstant = useRef(null);

  const showNotification = (messageList) => {
    _.forEach(messageList, (message) => {
      const showingMessage = getMessage(intl, message);
      showingMessage.position = 'tr';
      showingMessage.autoDismiss = _.isNil(showingMessage.autoDismiss) ? FIVE_SECOND : showingMessage.autoDismiss;
      notificationInstant.current.addNotification(showingMessage);
    });
  };

  useEffect(() => {
    if (_.size(notificationMessages) > 0) {
      showNotification(notificationMessages);
      dispatch(clearNotification());
    }
  }, [notificationMessages]);

  return <NotificationSystem ref={notificationInstant}/>;
};

export default Notification;
