import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

import { Container } from './styles';

export default function Signin() {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="FastFeet" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <Input name="password" type="password" placeholder="*************" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
