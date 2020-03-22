import React, { useState, useCallback, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';

import api from '../../services/api';
import history from '../../services/history';

export default function Receiver() {
  const [page, setPage] = useState(1);
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

  const loadDeliveryguys = useCallback(async () => {
    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });
    setReceiver(response);
    setFilteredReceiver(response);

    setIsVisible(
      response.map(_ => {
        return false;
      })
    );
  }, [page]);

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);
      toast.success('Destinatario deletados com sucesso');
      loadDeliveryguys();
    } catch (err) {
      toast.error('Erro ao tentar deletar o destinatário');
    }
  }

  useEffect(() => {
    loadDeliveryguys();
  }, [page]);

  return (
    <>
      <TableContainer
        title="Gerenciamento de destinatários"
        placeholderSearch="Buscar por destinatários"
        linkTo="/receiver/create"
        buttonText="Cadastrar"
        page={page}
        setPage={setPage}
        handleFilter={handleFilter}
        titleData={['ID', 'Nome', 'Endereço', 'Ações']}
      >
        <tbody>
          {filteredReceiver.length ? (
            filteredReceiver.map((r, index) => (
              <tr key={r.id}>
                <td>#{r.id}</td>
                <td>{r.name}</td>
                <td>{r.street || '-'}</td>
                <td>
                  <button type="button" onClick={() => handleToggle(index)}>
                    <span>...</span>
                  </button>
                  <ActionButtons isVisible={isVisible[index]}>
                    <button
                      type="button"
                      onClick={() => history.push(`/receiver/${r.id}`)}
                    >
                      <MdEdit color="#4D85EE" size={16} />
                      <span>Editar</span>
                    </button>
                    <button type="button" onClick={() => handleDelete(r.id)}>
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
