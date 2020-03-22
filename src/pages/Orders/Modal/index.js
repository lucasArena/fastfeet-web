import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { Container } from './styles';

import api from '../../../services/api';

export default function Modal({ id, ...rest }) {
  const [order, setOrder] = useState({});
  useEffect(() => {
    async function loadOrder() {
      const response = await api.get(`/orders/${id}`);
      setOrder(response);
    }
    loadOrder();
  }, []);

  return (
    <ReactModal
      ariaHideApp
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      style={{
        overlay: {
          background: 'Rgba(0,0,0,0.2)',
        },
        content: {
          background: '#fff',
          width: 450,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      {...rest}
    >
      <Container>
        <h4>Informações da encomenda</h4>
        <span>Rua: {order.recipient && order.recipient.street}</span>
        <span>
          {order.recipient && order.recipient.city}{' '}
          {order.recipient && order.recipient.state}
        </span>
        <span>{order.recipient && order.recipient.zipcode}</span>
        <hr />
        <h4>Datas</h4>
        <span>
          <h4>Retiradas:</h4> {order.start_date ? order.start_date : '-'}
        </span>
        <span>
          <h4>Entrega:</h4> {order.end_date ? order.end_date : '-'}
        </span>
        <h4>Assinatura do destinatário:</h4>
        <span>[ASSINATURA]</span>
      </Container>
    </ReactModal>
  );
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
};
