import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'uuid/v4';
import {
  NOTIFY_CREATE,
  NOTIFY_REMOVE,
  notifyAdd,
  notifyDelete,
  notifyRemoving,
} from './actions';
import { TEMP } from './constants';

const temp = {
  notifyType: 'FUNDS_TRANSFERRED_NTZ',
  category: 'NTZ Wallet',
  details: 'Sent 1,000 NTZ to 0x2381...3290',
  removing: false,
  dismissable: true,
  date: new Date(),
  type: 'success',
};

const persist = {
  notifyType: 'TABLE_JOINING',
  category: 'Joining Table',
  details: '0xdsaifoj...dskafj',
  removing: false,
  dismissable: false,
  date: new Date(),
  type: 'danger',
};

function* removeNotification(action) {
  // trigger remove note animation
  yield put(notifyRemoving(action.txId));
  // remove element after animation finishes
  yield call(delay, 400);
  yield put(notifyDelete(action.txId));
}

function* createNotification(action) {
  const newUuid = uuid();
  if (action.notifyType === TEMP) {
    temp.txId = newUuid;
    yield put(notifyAdd(temp));
  } else {
    // if persist
    persist.txId = newUuid;
    yield put(notifyAdd(persist));
  }
}

export function* notificationsSaga() {
  yield takeEvery(NOTIFY_CREATE, createNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
}

export default [
  notificationsSaga,
];
