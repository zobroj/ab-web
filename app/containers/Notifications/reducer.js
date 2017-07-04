// import { List, fromJS } from 'immutable';
import remove from 'lodash/remove';
import * as types from './actions';


export const initialState = [];

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {

    case types.NOTIFY_ADD: {
      console.log('add');
      const notifications = state;
      notifications.push(action.notification);
      return notifications;
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
