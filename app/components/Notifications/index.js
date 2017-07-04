import React from 'react';
import PropTypes from 'prop-types';
import Notifications from './Notification';
import { TEMP, PERSIST } from '../../containers/Notifications/constants';

const styles = {
  position: 'absolute',
  backgroundColor: 'green',
  color: 'white',
  marginTop: 100,
  zIndex: 100,
};

const Tester = (props) => {
  const { notifications } = props;
  return (
    <div>
      {/* testing related only */}
      <button
        style={{ ...styles, left: 120 }}
        onClick={() => props.notifyCreate(PERSIST)}
      >
        add persist
      </button>
      <button
        style={{ ...styles, left: 220 }}
        onClick={() => props.notifyCreate(TEMP)}
      >
        add temp
      </button>
      {/* <button
        style={{ ...styles, backgroundColor: 'red' }}
        onClick={() => this.popNotification('xxxxxx')}
      >
        pop
      </button> */}

      {/* only add this to container */}
      {notifications.length !== 0 && notifications.map(
        (item, i) => (
          <Notifications
            key={i}
            {...item}
            {...this.props}
          />
        )
      )}
    </div>
  );
};
Tester.propTypes = {
  notifyCreate: PropTypes.func,
  notifications: PropTypes.array,
};

export default Tester;
