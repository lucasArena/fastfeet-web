import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md';

import SearchbarTable from '../../components/SearchbarTable';
import TableContainer from '../../components/TableContainer';

import { Table, ActionButton } from './styles';

import api from '../../services/api';

export default function Orders() {
  const [isVisible, setIsVisible] = useState([]);
  const [orders, setOrders] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !visible
    );
    setIsVisible(toogleDisplay);
  }

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders');
      setOrders(response);

      setIsVisible(
        response.map(_ => {
          return false;
        })
      );
    }

    loadOrders();
  }, []);

  return (
    <>
      <TableContainer>
        <SearchbarTable
          title="Gerenciamento de encomandas"
          placeholder="Buscar encomendas"
          linkTo="/orders/create"
          buttonText="Cadastrar"
        />

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.recipient.name}</td>
                <td>{order.deliveryguy.name}</td>
                <td>Mogi das Cruzes</td>
                <td>São Paulo</td>
                <td>
                  <span>Pendente</span>
                </td>
                <td>
                  <button type="button" onClick={() => handleToggle(index)}>
                    <span>...</span>
                  </button>
                  <ActionButton isVisible={isVisible[index]}>
                    <button type="button">
                      <MdRemoveRedEye color="#A47CEC" size={16} />
                      <span>Vizualizar</span>
                    </button>
                    <button type="button">
                      <MdEdit color="#4D85EE" size={16} />
                      <span>Editar</span>
                    </button>
                    <button type="button">
                      <MdDelete color="#DE403B" size={16} />
                      <span>Excluir</span>
                    </button>
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}
