import React from 'react';
import PropTypes from 'prop-types';

import {
  Category,
  CloseButton,
  Details,
  Icon,
  Wrapper,
} from './styles';

const Notification = ({ category, details, dismissable }) => (
  <Wrapper>
    <Category>{category}</Category>
    <Details>{details}</Details>
    <Icon className="fa fa-info-circle" />
    {dismissable ? <CloseButton /> : null
    }
  </Wrapper>
);
Notification.propTypes = {
  category: PropTypes.string,
  details: PropTypes.string,
  dismissable: PropTypes.bool,
};
Notification.defaultProps = {
  category: 'Account Creation',
  details: 'Making your account now',
  dismissable: false,
};

export default Notification;
