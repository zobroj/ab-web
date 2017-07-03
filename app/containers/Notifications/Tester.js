import React from 'react';
import uuid from 'uuid';
import remove from 'lodash/remove';
import Notifications from '../../components/Notifications';
import { TEMP, PERSIST } from './constants';

const styles = {
  position: 'absolute',
  backgroundColor: 'green',
  color: 'white',
  marginTop: 100,
  zIndex: 100,
};

/*
const mockNotifications = [
  {
    notifyType: 'ACCOUNT_RECOVERING',
    txId: 1,
    category: 'Recovering Account',
    details: 'Waiting for transaction confirmation...',
    dismissable: false,
    type: 'info',
  },
  {
    notifyType: 'ACCOUNT_CREATING',
    txId: 2,
    category: 'Creating Account',
    details: 'Waiting for transaction confirmation...',
    dismissable: false,
    type: 'warning',
  },
  {
    notifyType: 'TABLE_JOINING',
    txId: 3,
    category: 'Joining Table',
    details: '0xdsaifoj...dskafj',
    dismissable: false,
    type: 'danger',
  },
  {
    notifyType: 'TABLE_LEFT',
    txId: 3,
    category: 'Left Table',
    details: ' 0xAdkls...dkafdi',
    dismissable: true,
    type: 'danger',
  },
  {
    notifyType: 'FUNDS_TRANSFERRED_ETH',
    txId: 4,
    category: 'ETH Wallet',
    details: 'Sent 0.002 ETH to 0x2381...3290',
    dismissable: true,
    type: 'success',
  },
  {
    notifyType: 'FUNDS_TRANSFERRED_ETH',
    txId: 5,
    category: 'ETH Wallet',
    details: 'Sent 0.002 ETH to 0x2381...3290',
    dismissable: true,
    type: 'success',
  },
  {
    notifyType: 'FUNDS_TRANSFERRED_NTZ',
    txId: 6,
    category: 'NTZ Wallet',
    details: 'Received 1,000 NTZ to 0x2381...3290',
    dismissable: true,
    type: 'success',
  },
  {
    notifyType: 'FUNDS_TRANSFERRED_NTZ',
    txId: 7,
    category: 'NTZ Wallet',
    details: 'Sent 1,000 NTZ to 0x2381...3290',
    dismissable: true,
    type: 'success',
  },
];
*/

const temp = {
  notifyType: 'FUNDS_TRANSFERRED_NTZ',
  txId: uuid(),
  category: 'NTZ Wallet',
  details: 'Sent 1,000 NTZ to 0x2381...3290',
  dismissable: true,
  type: 'success',
};

const persist = {
  notifyType: 'TABLE_JOINING',
  txId: uuid(),
  category: 'Joining Table',
  details: '0xdsaifoj...dskafj',
  dismissable: false,
  type: 'danger',
};

class Tester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [] };
    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }
  addNotification(type) {
    const { notifications } = this.state;
    if (type === PERSIST) {
      notifications.push(persist);
      this.setState({ notifications });
    }
    if (type === TEMP) {
      notifications.push(temp);
      this.setState({ notifications });
    }
    return null;
  }
  removeNotification(txId) {
    const { notifications } = this.state;
    remove(notifications, (note) => note.txId === txId);
    this.setState({ notifications });
  }
  render() {
    const { notifications } = this.state;
    return (
      <div>
        {/* testing related only */}
        <button
          style={{ ...styles, left: 80 }}
          onClick={() => this.addNotification(PERSIST)}
        >
          add persist
        </button>
        <button
          style={{ ...styles, left: 200 }}
          onClick={() => this.addNotification(TEMP)}
        >
          add temp
        </button>
        <button
          style={{ ...styles, backgroundColor: 'red' }}
          onClick={() => this.removeNotification('xxxxxx')}
        >
          remove
        </button>

        {/* only add this to container */}
        {notifications.length !== 0 && notifications.map(
          (item, i) => (
            <Notifications
              removeNotification={this.removeNotification}
              key={i}
              {...item}
              {...this.props}
            />
          )
        )}
      </div>
    );
  }
}

export default Tester;
