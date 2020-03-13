import React from 'react';

import SearchbarTable from '../../components/SearchbarTable';
import TableContainer from '../../components/TableContainer';

import { Table } from './styles';

export default function Orders() {
  return (
    // <div />
    <TableContainer>
      <SearchbarTable
        title="Gerenciamento de encomandas"
        placeholder="Buscar encomendas"
        linkTo="/orders/create"
        buttonText="Cadastrar"
      />

      <Table>
        <thead>
          <th>ID</th>
          <th>Destinatário</th>
          <th>Entregador</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Status</th>
          <th>Ações</th>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Lucas Arena</td>
            <td>Geovanna Cassará</td>
            <td>Mogi das Cruzes</td>
            <td>São Paulo</td>
            <td>Em transporte</td>
            <td>
              <button type="button">...</button>
            </td>
          </tr>

          <tr>
            <td>#02</td>
            <td>Geovanna Cassará</td>
            <td>Lucas Arena</td>
            <td>Mogi das Cruzes</td>
            <td>São Paulo</td>
            <td>Em transporte</td>
            <td>
              <button type="button">...</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
}
