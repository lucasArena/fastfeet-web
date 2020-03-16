import React from 'react';
import PropTypes from 'prop-types';

import SearchbarTable from '../SearchbarTable';

import { Container } from './styles';

export default function TableContainer({ children }) {
  return (
    <Container>
      <SearchbarTable
        title="Gerenciamento de encomandas"
        placeholder="Buscar encomendas"
        linkTo="/orders/create"
        buttonText="Cadastrar"
      />
      {children}
    </Container>
  );
}

TableContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};
