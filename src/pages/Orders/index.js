import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md';

import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';
import Modal from './Modal';
import { StatusOrder } from './styles';

import getColor from '../../utils/getColor';

import api from '../../services/api';
import history from '../../services/history';

export default function Orders() {
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !modalOpen && !visible
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
      const response = await api.get('/orders', {
        params: {
          page,
        },
      });
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
  }, [page]);

  return (
    <>
      <TableContainer
        title="Gerenciamento de encomandas"
        placeholderSearch="Buscar encomendas"
        linkTo="/orders/create"
        buttonText="Cadastrar"
        page={page}
        setPage={setPage}
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
                    <button
                      type="button"
                      onClick={() => {
                        handleToggle(index);
                        setModalOpen(!modalOpen);
                      }}
                    >
                      <MdRemoveRedEye color="#A47CEC" size={16} />
                      <span>Vizualizar</span>
                      <Modal isOpen={modalOpen} id={order.id} />
                    </button>
                    <button
                      type="button"
                      onClick={() => history.push(`/orders/edit/${order.id}`)}
                    >
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
