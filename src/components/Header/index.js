import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

import { Container, NavButton } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const [tabs, setTabs] = useState([
    {
      name: 'Encomendas',
      link: '/orders',
      selected: true,
    },
    {
      name: 'Entregadores',
      link: '/deliveryguys',
      selected: false,
    },
    {
      name: 'Destinatarios',
      link: '/receiver',
      selected: false,
    },
    {
      name: 'Problemas',
      link: '/problems',
      selected: false,
    },
  ]);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleTabs(link) {
    const newTabsSelected = tabs.map(tab =>
      tab.link === link
        ? { ...tab, selected: !tab.selected }
        : { ...tab, selected: false }
    );
    setTabs(newTabsSelected);
  }

  useEffect(() => {
    // const countTabs = document.querySelectorAll('header a').length;
  }, []);

  return (
    <Container>
      <header>
        <img src={logo} alt="FastFeet" />
        <div>
          {tabs.map(tab => (
            <NavButton
              key={tab.link}
              to={tab.link}
              onClick={() => handleTabs(tab.link)}
              selected={tab.selected}
            >
              {tab.name}
            </NavButton>
          ))}
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
