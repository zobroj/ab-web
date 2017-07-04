import { List, fromJS } from 'immutable';
import remove from 'lodash/remove';
import * as types from './actions';

export const initialState = List([]);

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {

    case types.NOTIFY_ADD: {
      const notification = fromJS(action.notification);
      const newState = state.push(notification);
      return newState;
    }

    case types.NOTIFY_DELETE: {
      const notifications = state.toJS();
      remove(notifications, (note) => note.txId === action.txId);
      return notifications;
    }
    /*
    case types.NOTIFY_UPDATE: {}
    */

    default: {
      return state;
    }
  }
}
