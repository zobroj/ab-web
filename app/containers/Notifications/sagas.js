import React from 'react';
import { put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'uuid/v4';
import Info from '../../components/Notifications';
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
  info: <Info />,
};

function* createTempNotification(txId) {
  temp.txId = txId;
  yield put(notifyAdd(temp));
  // TODO don't call removeNotification if NOTIFY_REMOVE is already dispatched
  // wait for NOTIFY_REMOVE to be dispatched by the user
  // or call NOTIFY_REMOVE after timeout
  yield delay(3000);
  yield* removeNotification({ txId });
}

function* createPersistNotification(txId) {
  persist.txId = txId;
  yield put(notifyAdd(persist));
}

function* selectNotification(action) {
  const txId = uuid();
  if (action.notifyType === TEMP) {
    yield* createTempNotification(txId);
  } else {
    // if persist
    yield* createPersistNotification(txId);
  }
}

function* removeNotification(action) {
  // trigger remove note animation
  yield put(notifyRemoving(action.txId));
  // remove element after animation finishes
  yield delay(400);
  yield put(notifyDelete(action.txId));
}

export function* notificationsSaga() {
  yield takeEvery(NOTIFY_CREATE, selectNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
}

export default [
  notificationsSaga,
];
