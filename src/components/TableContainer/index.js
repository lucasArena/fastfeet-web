import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TableContainer({ children }) {
  return <Container>{children}</Container>;
}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
