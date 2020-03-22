import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  p {
    color: #444444;
    font-weight: bold;
  }

  span {
    color: #f24424;
    font-weight: bold;
    margin-top: 5px;
  }

  input {
    padding: 10px 15px;
    border: 1.5px solid #eee;
    border-radius: 4px;
    margin: 5px 0;
  }
`;
