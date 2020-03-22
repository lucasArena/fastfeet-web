import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Row, GroupInput, FormFields } from './styles';
import FormContainer from '../../../components/FormContainer';
import AsyncSelect from '../../../components/AsyncSelect';

import api from '../../../services/api';

export default function MainForm() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [deliveryguys, setDeliveryguys] = useState([]);
  const [receivers, setReceivers] = useState([]);

  const schema = Yup.object().shape({
    deliveryguy_id: Yup.string().required('O campo entregador é obrigatório'),
    recipient_id: Yup.string().required('O campo destinatário é obrigatório'),
    product: Yup.string().required('O campo produto é obrigatório'),
    id: Yup.string(),
  });

  async function handleSave(data) {
    try {
      if (data.id) {
        await api.put(`/orders/${data.id}`, data);
        toast.success('Encomenda atualizado com sucesso');
      } else {
        await api.post('/orders', data);
        toast.success('Encomenda cadastro com sucesso');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar');
    }
  }

  async function loadOrder() {
    if (!isNaN(id)) {
      const response = await api.get(`/orders/${id}`);
      setOrder(response);
    }
  }

  async function loadReceiver() {
    const response = await api.get('/recipients');

    const data = response.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));

    setReceivers(data);
  }

  async function loadDeliveryguys() {
    try {
      const response = await api.get('/deliveryguys');
      const data = response.map(d => ({ value: d.id, label: d.name }));
      setDeliveryguys(data);
    } catch (err) {
      toast.error('Erro ao carregar os entregadores');
    }
  }

  useEffect(() => {
    loadDeliveryguys();
    loadReceiver();
    loadOrder();
  }, []);
  return (
    <FormContainer
      title={
        Object.keys(order).length
          ? 'Edição de destinatário'
          : 'Cadastro de destinatário'
      }
      handleSubmit={handleSave}
      schema={schema}
      initialData={order}
    >
      <FormFields>
        <Row>
          <GroupInput>
            <p>Destinatário</p>
            <AsyncSelect
              type="text"
              name="recipient_id"
              label="Destinatário"
              cacheOptions
              placeholder="Selecione"
              defaultOptions={receivers}
              defaultInputValue={order.recipient && order.recipient.name}
            />
          </GroupInput>
          <GroupInput>
            <p>Entregador</p>
            <AsyncSelect
              label="Entregador"
              type="text"
              name="deliveryguy_id"
              cacheOptions
              placeholder="Selecione"
              defaultInputValue={order.deliveryguy && order.deliveryguy.name}
              defaultOptions={deliveryguys}
            />
          </GroupInput>
        </Row>

        <Row>
          <GroupInput>
            <p>Nome do produto</p>
            <Input name="product" placeholder="Nome completo" />
          </GroupInput>
        </Row>

        <Row>
          <Input type="hidden" name="id" />
        </Row>
      </FormFields>
    </FormContainer>
  );
}
