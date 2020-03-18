import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md';

import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';
import { StatusOrder } from './styles';

import getColor from '../../utils/getColor';

import api from '../../services/api';

export default function Orders() {
  const [isVisible, setIsVisible] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !visible
    );
    setIsVisible(toogleDisplay);
  }

  function handleFilter({ target }) {
    if (!target.value) {
      setFilteredOrders(orders);
      return;
    }
    const filterData = orders.filter(
      o =>
        o.id === parseInt(target.value, 10) ||
        o.recipient.name.toLowerCase().includes(target.value.toLowerCase()) ||
        o.deliveryguy.name.toLowerCase().includes(target.value.toLowerCase())
    );
    setFilteredOrders(filterData);
  }

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders');
      const formattedOrder = response.map(order => {
        const [color, status] = getColor(
          order.start_date,
          order.end_date,
          order.canceled_at
        );
        return {
          ...order,
          color,
          status,
        };
      });
      setOrders(formattedOrder);
      setFilteredOrders(formattedOrder);

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
      <TableContainer
        title="Gerenciamento de encomandas"
        placeholderSearch="Buscar encomendas"
        linkTo="/orders/create"
        buttonText="Cadastrar"
        handleFilter={handleFilter}
        titleData={[
          'ID',
          'Destinatário',
          'Entregador',
          'Cidade',
          'Estado',
          'Status',
          'Ações',
        ]}
      >
        <tbody>
          {filteredOrders.length ? (
            filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.recipient.name}</td>
                <td>{order.deliveryguy.name}</td>
                <td>{order.recipient.city || '-'}</td>
                <td>{order.recipient.state || '-'}</td>
                <td>
                  <StatusOrder color={order.color}>{order.status}</StatusOrder>
                </td>
                <td>
                  <button type="button" onClick={() => handleToggle(index)}>
                    <span>...</span>
                  </button>
                  <ActionButtons isVisible={isVisible[index]}>
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
                  </ActionButtons>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Não existem registros</td>
            </tr>
          )}
        </tbody>
      </TableContainer>
    </>
  );
}
