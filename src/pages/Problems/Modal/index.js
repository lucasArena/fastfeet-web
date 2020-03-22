import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { Container } from './styles';

import api from '../../../services/api';

export default function Modal({ id, ...rest }) {
  const [problems, setProblems] = useState({});
  useEffect(() => {
    async function loadOrder() {
      const response = await api.get(`order/${id}/problems/`);
      setProblems(response);
    }
    loadOrder();
  }, [id]);

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
        <h4>VISUALIZAR PROBLEMA</h4>

        {problems.length &&
          problems.map((problem, index) => (
            <span>
              {index + 1} - {problem.description}
            </span>
          ))}
      </Container>
    </ReactModal>
  );
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
};
