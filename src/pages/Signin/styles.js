import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  img {
    align-self: center;
    width: 250px;
    width: 300px;
    margin: 30px 0;
  }

  form {
    display: flex;
    flex-direction: column;

    span {
      text-align: left;
      letter-spacing: 0;
      color: #fb6f91;
      text-align: center;
      opacity: 1;
      font-size: 13px;
      font-weight: bold;
    }

    input {
      border-radius: 4px;
      padding: 15px 20px;
      border: 1px solid #eee;
      margin: 10px 0px;
      font-size: 16px;
    }

    button {
      background: #7159c1;
      padding: 15px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 10px;
      transition: background 0.3;

      &:hover {
        background: ${darken(0.02, '#7159c1')};
      }
    }
  }
`;
