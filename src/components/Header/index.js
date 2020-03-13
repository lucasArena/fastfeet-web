import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

import { Container, NavButton } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="FastFeet" />
        <div>
          {}
          <NavButton to="/" selected>
            Encomendas
          </NavButton>
          <NavButton to="/">Entregadores</NavButton>
          <NavButton to="/">Destinatarios</NavButton>
          <NavButton to="/">Problemas</NavButton>
        </div>
      </header>
      <aside>
        <strong>Admin FastFeet</strong>
        <button type="button" onClick={handleSignOut}>
          Sair do FastFeet
        </button>
      </aside>
    </Container>
  );
}
