import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';

import api from '../../services/api';

export default function Receiver() {
  const [isVisible, setIsVisible] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [filteredReceiver, setFilteredReceiver] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !visible
    );
    setIsVisible(toogleDisplay);
  }

  function handleFilter({ target }) {
    if (!target.value) {
      setFilteredReceiver(receiver);
      return;
    }
    const filterData = receiver.filter(
      o =>
        o.id === parseInt(target.value, 10) ||
        o.name.toLowerCase().includes(target.value.toLowerCase()) ||
        (o.street &&
          o.street.toLowerCase().includes(target.value.toLowerCase()))
    );
    setFilteredReceiver(filterData);
  }

  useEffect(() => {
    async function loadDeliveryguys() {
      const response = await api.get('/recipients');
      setReceiver(response);
      setFilteredReceiver(response);

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
        titleData={['ID', 'Nome', 'Endereço', 'Ações']}
      >
        <tbody>
          {filteredReceiver.length ? (
            filteredReceiver.map((delivery, index) => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.name}</td>
                <td>{delivery.street || '-'}</td>
                <td>
                  <button type="button" onClick={() => handleToggle(index)}>
                    <span>...</span>
                  </button>
                  <ActionButtons isVisible={isVisible[index]}>
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
              <td colSpan={6}>Não existem registros</td>
            </tr>
          )}
        </tbody>
      </TableContainer>
    </>
  );
}
