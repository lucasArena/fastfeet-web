import React, { useState, useEffect, useCallback } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { toast } from 'react-toastify';
import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';

import Modal from './Modal';

import api from '../../services/api';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [isVisible, setIsVisible] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !openModal && !visible
    );
    setIsVisible(toogleDisplay);
  }

  function handleFilter({ target }) {
    if (!target.value) {
      setFilteredProblems(problems);
      return;
    }
    const filterData = problems.filter(
      p =>
        p.id === parseInt(target.value, 10) ||
        p.description.toLowerCase().includes(target.value.toLowerCase())
    );
    setFilteredProblems(filterData);
  }

  const loadProblems = useCallback(async () => {
    const response = await api.get('/order/problems', {
      params: {
        page,
      },
    });
    setProblems(response);
    setFilteredProblems(response);

    setIsVisible(
      response.map(_ => {
        return false;
      })
    );
  }, [page]);

  async function handleCancel(orderId) {
    try {
      await api.delete(`orders/${orderId}`);
      toast.success('Pedido cancelado com sucesso');
      loadProblems();
    } catch (err) {
      toast.error('Erro ao tentar cancelar o pedido');
    }
  }

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <>
      <TableContainer
        title="Gerenciamento de destinatários"
        placeholderSearch="Buscar por destinatários"
        linkTo="/receiver/create"
        buttonText="Cadastrar"
        showButtons={false}
        page={page}
        setPage={setPage}
        handleFilter={handleFilter}
        titleData={['ID', 'Problema', 'Ações']}
      >
        <tbody>
          {filteredProblems.length ? (
            filteredProblems.map((problem, index) => (
              <tr key={problem.id}>
                <td>#{problem.id}</td>
                <td>{problem.description}</td>
                <td>
                  <button type="button" onClick={() => handleToggle(index)}>
                    <span>...</span>
                  </button>
                  <ActionButtons isVisible={isVisible[index]}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenModal(!openModal);
                        handleToggle(index);
                      }}
                    >
                      <MdEdit color="#4D85EE" size={16} />
                      <span>Visualizar</span>
                      <Modal id={problem.order_id} isOpen={openModal} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancel(problem.order_id)}
                    >
                      <MdDelete color="#DE403B" size={16} />
                      <span>Cancelar encomenda</span>
                    </button>
                  </ActionButtons>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Não existem registros</td>
            </tr>
          )}
        </tbody>
      </TableContainer>
    </>
  );
}
