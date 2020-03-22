import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Image } from './styles';

import api from '../../services/api';

export default function Avatar({ data }) {
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState('');
  const ref = useRef();
  const { registerField } = useField('avatar');

  async function handleAvatar({ target }) {
    try {
      const formData = new FormData();

      formData.append('file', target.files[0]);

      const response = await api.post('/files', formData);
      setPreview(response.url);
      setFile(response.id);
    } catch (err) {
      toast.error('Erro ao tentar salvar imagem');
    }
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    setPreview(data.url);
    setFile(data.id);
  }, [data]);
  return (
    <Image htmlFor="avatar">
      <img
        src={
          preview || 'https://api.adorable.io/avatars/50/demo@adorable.io.png'
        }
        alt="Perfil"
      />
      <input
        type="file"
        accept="image/*"
        name="avatar_id"
        data-file={file}
        id="avatar"
        ref={ref}
        onChange={handleAvatar}
      />
    </Image>
  );
}

Avatar.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

Avatar.defaultProps = {
  data: {
    id: null,
    path: '',
    url: '',
  },
};
