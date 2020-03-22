import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { InputGroup } from './styles';

import FormContainer from '../../../components/FormContainer';
import Avatar from '../../../components/Avatar';

import api from '../../../services/api';

export default function MainForm() {
  const { id } = useParams();

  const [deliveryguy, setDeliveryguy] = useState({});
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('O email é obrigatório'),
    id: Yup.string(),
    avatar_id: Yup.string().required(),
  });

  async function handleSave(data) {
    try {
      if (data.id) {
        await api.put(`/deliveryguys/${data.id}`, data);
        toast.success('Entregador atualizado com sucesso');
      } else {
        await api.post('/deliveryguys', data);
        toast.success('Entregador cadastro com sucesso');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar');
    }
  }

  const loadDeliveryguy = useCallback(async () => {
    const response = await api.get(`/deliveryguys/${id}`);
    setDeliveryguy(response);
  }, [id]);

  useEffect(() => {
    loadDeliveryguy();
  }, []);

  return (
    <FormContainer
      title={deliveryguy ? 'Edição de entregador' : 'Cadastro de entregadores'}
      handleSubmit={handleSave}
      schema={schema}
      initialData={deliveryguy}
    >
      <>
        <Avatar name="avatar_id" data={deliveryguy && deliveryguy.avatar} />
        <InputGroup>
          <p>Nome</p>
          <Input name="name" placeholder="Nome completo" />
        </InputGroup>
        <InputGroup>
          <p>Email</p>
          <Input
            type="email"
            name="email"
            placeholder="exemplo@exemplo.com.br"
          />
        </InputGroup>

        <InputGroup>
          <Input type="hidden" name="id" />
        </InputGroup>
      </>
    </FormContainer>
  );
}
