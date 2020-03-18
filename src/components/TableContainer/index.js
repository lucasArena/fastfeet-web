import React from 'react';
import PropTypes from 'prop-types';

import SearchbarTable from '../SearchbarTable';

import { Container, Table } from './styles';

export default function TableContainer({
  children,
  title,
  placeholderSearch,
  linkTo,
  buttonText,
  titleData,
  handleFilter,
}) {
  return (
    <Container>
      <SearchbarTable
        title={title}
        placeholderSearch={placeholderSearch}
        linkTo={linkTo}
        buttonText={buttonText}
        handleFilter={handleFilter}
      />
      <Table>
        <thead>
          <tr>
            {titleData.map(t => (
              <th key={t}>{t}</th>
            ))}
          </tr>
        </thead>
        {children}
      </Table>
    </Container>
  );
}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  title: PropTypes.string.isRequired,
  placeholderSearch: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  titleData: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilter: PropTypes.func.isRequired,
};
