import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'uuid/v4';

import { getWeb3 } from '../AccountProvider/utils';

import {
  NOTIFY_CREATE,
  NOTIFY_REMOVE,
  notifyAdd,
  notifyDelete,
  notifyRemoving,
} from './actions';

import {
  SET_AUTH,
  CONTRACT_TX_SUCCESS,
} from '../AccountProvider/actions';

// import { ABI_TABLE } from '../../app.config';

import {
  TEMP,
  loggedInSuccess,
  tableJoining,
  tableJoined,
  temp,
  persist,
} from './constants';

function* createTempNotification(note) {
  yield put(notifyAdd(note));
  // TODO don't call removeNotification if NOTIFY_REMOVE is already dispatched
  // wait for NOTIFY_REMOVE to be dispatched by the user
  // or call NOTIFY_REMOVE after timeout
  yield delay(3000);
  yield* removeNotification(note.txId);
}

function* createPersistNotification(note) {
  yield put(notifyAdd(note));
}

function* selectNotification(action) {
  if (action.notifyType === TEMP) {
    temp.txId = uuid();
    yield* createTempNotification(temp);
  } else {
    persist.txId = uuid();
    // if persist
    yield* createPersistNotification(persist);
  }
}

function* removeNotification(txId) {
  // trigger remove note animation
  yield put(notifyRemoving(txId));
  // remove element after animation finishes
  yield delay(400);
  yield put(notifyDelete(txId));
}

function* authNotification({ newAuthState }) {
  const { loggedIn } = newAuthState;
  if (loggedIn) {
    yield* createTempNotification(loggedInSuccess);
  }
}

function* txSuccess(action) {
  const { address, methodName, txHash } = action.payload;
  // begin joinTable process
  if (methodName === 'join') {
    const note = tableJoining;
    note.txId = txHash; // transactionId
    note.details = address; // tableId
    yield* createPersistNotification(note);

    // end joinTable process

    try {
      const web3 = yield call(getWeb3);
      yield call(waitForTx, web3, txHash);
      // create new temp notification of join table success
      const joinedNote = tableJoined;
      joinedNote.details = event.address; // tableId
      yield* createTempNotification(joinedNote);
      // then delete previous
      yield* removeNotification(event.transactionHash);
    } catch (err) {
      // Notify about failed joining?
      console.error(err); // eslint-disable-line no-console
    }
  }
}

export function* notificationsSaga() {
  yield takeEvery(SET_AUTH, authNotification);
  yield takeEvery(CONTRACT_TX_SUCCESS, txSuccess);
  yield takeEvery(NOTIFY_CREATE, selectNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
}

export default [
  notificationsSaga,
];

function waitForTx(web3, txHash) {
  return new Promise((resolve, reject) => {
    const filter = web3.eth.filter('latest');
    web3.eth.getTransaction(txHash, (txError, transaction) => {
      if (txError) {
        reject(txError);
      } else {
        filter.watch((err, blockHash) => {
          if (err) {
            reject(err);
            filter.stopWatching(() => null);
          }

          web3.eth.getBlock(blockHash, true, (blockErr, block) => {
            if (!blockErr) {
              const hasTx = block.transactions.some((tx) => tx.hash === txHash);

              if (hasTx) {
                web3.eth.getTransactionReceipt(txHash, (receipErr, receipt) => {
                  if (receipt && receipt.gasUsed >= transaction.gas) {
                    return reject('Ran out of gas, tx likely failed');
                  }

                  filter.stopWatching(() => null);
                  return resolve(txHash);
                });
              }
            }
          });
        });
      }
    });
  });
}
