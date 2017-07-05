import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import { notLoggedIn } from '../../containers/Notifications/constants';

const Tester = (props) => {
  const { notifications, loggedIn } = props;
  if (loggedIn) {
    return (
      <div>
        {notifications.length !== 0 &&
          notifications.map(
            (item, i) => <Notification key={i} {...item} {...props} />,
          )
        }
      </div>
    );
  }
  return <Notification {...notLoggedIn} {...props} />;
};
Tester.propTypes = {
  loggedIn: PropTypes.bool,
  notifications: PropTypes.array,
};

export default Tester;
