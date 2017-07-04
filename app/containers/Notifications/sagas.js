import { put, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid';
import {
  NOTIFY_CREATE,
  // NOTIFY_REMOVE,
  notifyAdd,
} from './actions';
import { TEMP } from './constants';

const temp = {
  notifyType: 'FUNDS_TRANSFERRED_NTZ',
  txId: uuid(),
  category: 'NTZ Wallet',
  details: 'Sent 1,000 NTZ to 0x2381...3290',
  removing: false,
  dismissable: true,
  date: new Date(),
  type: 'success',
};

const persist = {
  notifyType: 'TABLE_JOINING',
  txId: uuid(),
  category: 'Joining Table',
  details: '0xdsaifoj...dskafj',
  removing: false,
  dismissable: false,
  date: new Date(),
  type: 'danger',
};

/*
export function* removeNotification(txId) {
  // trigger remove note animation
  notifications.map((note) => {
    if (note.txId === txId) {
      note.removing = true; // eslint-disable-line no-param-reassign
      return note;
    }
    return note;
  });
  this.setState({ notifications });
  */

  // remove element after animation finishes
  /*
  const removeNote = () => {
    remove(notifications, (note) => note.txId === action.txId);
    return notifications;
  };
  setTimeout(removeNote, 500);
}
*/

export function* createNotification(action) {
  console.log('yo');
  if (action.notifyType === TEMP) {
    yield put(notifyAdd(temp));
  } else {
    // if persist
    yield put(notifyAdd(persist));
  }
}

export function* notificationsSaga() {
  yield takeEvery(NOTIFY_CREATE, createNotification);
}

export default [
  notificationsSaga,
];
