import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { notifyRemove, notifyCreate } from './actions';
import { selectNotifications } from './selectors';

import Notifications from '../../components/Notifications';

const NotificationsContainer = (props) => (
  <Notifications {...props} />
);

const mapDispatchToProps = (dispatch) => ({
  notifyRemove: (txId) => dispatch(notifyRemove(txId)),
  notifyCreate: (type) => dispatch(notifyCreate(type)),
});

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsContainer);
