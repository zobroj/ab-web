import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonWrapper,
  Category,
  Container,
  IconWrapper,
  Details,
  Icon,
  Wrapper,
} from './styles';

const Notification = ({ category, details, dismissable, isNotTable, type }) => (
  <Container type={type} isNotTable={isNotTable}>
    <Wrapper type={type} isNotTable={isNotTable}>
      <Category>{category}</Category>
      <Details>{details}</Details>
      <IconWrapper>
        <Icon className="fa fa-info-circle" />
        {dismissable &&
          <ButtonWrapper>
            <Icon className="fa fa-times" />
          </ButtonWrapper>
        }
      </IconWrapper>
    </Wrapper>
  </Container>
);
Notification.propTypes = {
  category: PropTypes.string,
  details: PropTypes.string,
  dismissable: PropTypes.bool,
  isNotTable: PropTypes.bool,
  type: PropTypes.string,
};
Notification.defaultProps = {
  category: 'Creating Account',
  details: 'Waiting for transaction confirmation...',
  dismissable: true,
  isNotTable: false,
  type: 'info',
};

export default Notification;
