import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';

import { Picture } from './styles';

import api from '../../services/api';

export default function Deliveryguys() {
  const [isVisible, setIsVisible] = useState([]);
  const [deliveryguys, setDeliveryguys] = useState([]);
  const [filteredDeliveryguys, setFilteredDeliveryguys] = useState([]);

  function handleToggle(index) {
    const toogleDisplay = isVisible.map(
      (visible, i) => i === index && !visible
    );
    setIsVisible(toogleDisplay);
  }

  function handleFilter({ target }) {
    if (!target.value) {
      setFilteredDeliveryguys(deliveryguys);
      return;
    }
    const filterData = deliveryguys.filter(
      o =>
        o.id === parseInt(target.value, 10) ||
        o.name.toLowerCase().includes(target.value.toLowerCase()) ||
        o.email.toLowerCase().includes(target.value.toLowerCase())
    );
    setFilteredDeliveryguys(filterData);
  }

  useEffect(() => {
    async function loadDeliveryguys() {
      const response = await api.get('/deliveryguys');
      setDeliveryguys(response);
      setFilteredDeliveryguys(response);

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
        title="Gerenciamento de entregadores"
        placeholderSearch="Buscar por entregadores"
        linkTo="/deliveryguys/create"
        buttonText="Cadastrar"
        handleFilter={handleFilter}
        titleData={['ID', 'Foto', 'Nome', 'Email', 'Ações']}
      >
        <tbody>
          {filteredDeliveryguys.length ? (
            filteredDeliveryguys.map((delivery, index) => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>
                  <Picture
                    src={
                      delivery.url
                        ? delivery.url
                        : 'https://api.adorable.io/avatars/50/demo@adorable.io.png'
                    }
                  />
                </td>
                <td>{delivery.name}</td>
                <td>{delivery.email}</td>
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
