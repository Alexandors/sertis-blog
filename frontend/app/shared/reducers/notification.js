/*
 *
 * Notification reducer
 *
 */

import { fromJS } from 'immutable';
import { ActionType } from 'shared/constants/actionType';

const initialState = fromJS({
  messages: [],
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SHOW_NOTIFICATION: {
      return state.set('messages', fromJS([action.payload]));
    }
    case ActionType.CLEAR_NOTIFICATION_MESSAGE: {
      return state.set('messages', fromJS([]));
    }
    default: {
      return state;
    }
  }
}

export default notificationReducer;
