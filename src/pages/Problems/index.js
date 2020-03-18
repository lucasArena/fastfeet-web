import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';

import api from '../../services/api';

export default function Problems() {
  const [isVisible, setIsVisible] = useState([]);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !visible
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

  useEffect(() => {
    async function loadDeliveryguys() {
      const response = await api.get('/order/problems');
      setProblems(response);
      setFilteredProblems(response);

      setIsVisible(
        response.map(_ => {
          return false;
        })
      );
    }

    loadDeliveryguys();
  }, []);

  return (
    <>
      <TableContainer
        title="Gerenciamento de destinatários"
        placeholderSearch="Buscar por destinatários"
        linkTo="/receiver/create"
        buttonText="Cadastrar"
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
                    <button type="button">
                      <MdEdit color="#4D85EE" size={16} />
                      <span>Visualizar</span>
                    </button>
                    <button type="button">
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
