import React from 'react';
import PropTypes from 'prop-types';

import SearchbarTable from '../SearchbarTable';

import { Container } from './styles';

export default function TableContainer({
  children,
  title,
  placeholderSearch,
  linkTo,
  buttonText,
}) {
  return (
    <Container>
      <SearchbarTable
        title={title}
        placeholderSearch={placeholderSearch}
        linkTo={linkTo}
        buttonText={buttonText}
      />
      {children}
    </Container>
  );
}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};
