import React, { useCallback, useState, useEffect, useRef } from 'react';
import InpukMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import { Input, useField } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Row, GroupInput, FormFields } from './styles';
import FormContainer from '../../../components/FormContainer';

import api from '../../../services/api';

export default function MainForm() {
  const { id } = useParams();
  const ref = useRef('zipcode');
  const { registerField } = useField('zipcode');
  const [receiver, setReceiver] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    street: Yup.string().required('O campo rua é obrigatório'),
    number: Yup.string().required('O campo número é obrigatório'),
    complement: Yup.string(),
    city: Yup.string().required('O campo cidae é obrigatório'),
    state: Yup.string().required('O campo estado é obrigatório'),
    zipcode: Yup.string().required('O campo CEP é obrigatório'),
    id: Yup.string(),
  });

  async function handleSave(data) {
    try {
      const {
        street,
        number,
        complement,
        city,
        state,
        zipcode,
        ...rest
      } = data;
      if (data.id) {
        await api.put(`/recipients/${data.id}`, {
          ...rest,
          address: {
            street,
            number: Number(number),
            complement,
            city,
            state,
            zipcode,
          },
        });
        toast.success('Destinatário atualizado com sucesso');
      } else {
        await api.post('/recipients', {
          ...rest,
          address: {
            street,
            number: Number(number),
            complement,
            city,
            state,
            zipcode,
          },
        });
        toast.success('Destinatário cadastro com sucesso');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar');
    }
  }

  const loadReceiver = useCallback(async () => {
    if (id) {
      const response = await api.get(`/recipients/${id}`);
      setReceiver(response);
    }
  }, [id]);

  useEffect(() => {
    console.log(ref.current);
    if (ref.current) {
      registerField({
        name: 'zipcode',
        ref: ref.current,
        path: 'state.value',
      });
    }
  }, [registerField, ref]);

  useEffect(() => {
    loadReceiver();
  }, []);

  return (
    <FormContainer
      title={receiver ? 'Edição de destinatário' : 'Cadastro de destinatário'}
      handleSubmit={handleSave}
      schema={schema}
      initialData={receiver}
    >
      <FormFields>
        <Row>
          <GroupInput>
            <p>Nome</p>
            <Input name="name" placeholder="Nome completo" />
          </GroupInput>
        </Row>
        <Row>
          <GroupInput width="60%">
            <p>Rua</p>
            <Input name="street" placeholder="Rua Bethoven" />
          </GroupInput>

          <GroupInput width="20%">
            <p>Número</p>
            <Input type="number" name="number" placeholder="1729" />
          </GroupInput>
          <GroupInput width="20%">
            <p>Complemento</p>
            <Input name="complement" />
          </GroupInput>
        </Row>

        <Row>
          <GroupInput>
            <p>Cidade</p>
            <Input name="city" placeholder="exemplo@exemplo.com.br" />
          </GroupInput>

          <GroupInput>
            <p>Estado</p>
            <Input name="state" placeholder="Diadema" />
          </GroupInput>
          <GroupInput>
            <p>CEP</p>
            <InpukMask
              alwaysShowMask={false}
              maskChar=""
              mask="99999-999"
              placeholder="08730-760"
              ref={ref}
              value={receiver.zipcode}
              onChange={event =>
                setReceiver({ ...receiver, zipcode: event.target.value })
              }
            >
              {() => <Input name="zipcode" />}
            </InpukMask>
          </GroupInput>
        </Row>

        <Row>
          <Input type="hidden" name="id" />
        </Row>
      </FormFields>
    </FormContainer>
  );
}
