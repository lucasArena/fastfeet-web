import React from 'react';
import PropTypes from 'prop-types';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import SearchbarTable from '../SearchbarTable';

import { Container, Table, Footer } from './styles';

export default function TableContainer({
  children,
  title,
  placeholderSearch,
  linkTo,
  buttonText,
  showButtons,
  titleData,
  handleFilter,
  page,
  setPage,
}) {
  async function handlePagePrev() {
    if (page <= 1) return;

    setPage(page - 1);
  }

  async function handlePageNext() {
    setPage(page + 1);
  }

  return (
    <Container>
      <SearchbarTable
        title={title}
        placeholderSearch={placeholderSearch}
        linkTo={linkTo}
        buttonText={buttonText}
        showButtons={showButtons}
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
      <Footer>
        <span>
          <MdNavigateBefore color="#000" size={36} onClick={handlePagePrev} />
        </span>
        <span>Página {page}</span>
        <span>
          <MdNavigateNext color="#000" size={36} onClick={handlePageNext} />
        </span>
      </Footer>
    </Container>
  );
}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  title: PropTypes.string.isRequired,
  placeholderSearch: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  showButtons: PropTypes.bool,
  titleData: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilter: PropTypes.func.isRequired,
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
};

TableContainer.defaultProps = {
  showButtons: true,
  page: 1,
};
