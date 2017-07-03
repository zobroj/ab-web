import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonWrapper,
  Category,
  Container,
  IconWrapper,
  Icon,
  Details,
  Wrapper,
} from './styles';

const Notification = ({
  category,
  details,
  dismissable,
  isNotTable,
  removeNotification,
  type,
  txId,
}) => (
  <Container type={type} isNotTable={isNotTable}>
    <Wrapper type={type} isNotTable={isNotTable}>
      <Category>{category}</Category>
      <Details>{details}</Details>
      <IconWrapper>
        {dismissable &&
          <ButtonWrapper onClick={() => removeNotification(txId)}>
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
  removeNotification: PropTypes.func,
  type: PropTypes.string,
  txId: PropTypes.string,
};
Notification.defaultProps = {
  category: 'Creating Account',
  details: '',
  dismissable: true,
  isNotTable: false,
  removeNotification: () => {},
  type: 'danger',
  txId: '',
};

export default Notification;
