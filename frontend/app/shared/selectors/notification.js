import { createSelector } from 'reselect';

export const reducerKey = 'notification';

export const getNotificationMessages = createSelector(
  (state) => state.getIn([reducerKey, 'messages']),
  (notificationMessages) => notificationMessages.toJS(),
);
