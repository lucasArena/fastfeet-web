import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ActionsButtons({ children, isVisible }) {
  return <Container isVisible={isVisible}>{children}</Container>;
}

ActionsButtons.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isVisible: PropTypes.bool.isRequired,
};
