import styled from 'styled-components';

export const Image = styled.label`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;
