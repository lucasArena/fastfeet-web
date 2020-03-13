import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SearchbarTable({
  title,
  placeholder,
  linkTo,
  buttonText,
}) {
  return (
    <Container>
      <h1>{title}</h1>

      <div>
        <input placeholder={placeholder} />
        <Link to={linkTo}>
          <button type="button">
            <MdAdd size={24} color="#fff" />
            {buttonText}
          </button>
        </Link>
      </div>
    </Container>
  );
}

SearchbarTable.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
