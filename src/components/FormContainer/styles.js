import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  min-width: 1000px;

  content {
    background: #fff;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  h1 {
    color: #444444;
  }

  div {
    display: flex;
  }
`;

export const MainForm = styled(Form)`
  main {
    padding: 20px;
    background: #fff;
  }
`;

export const FormButton = styled.button`
  background: ${props => props.color && props.color};
  border-radius: 4px;
  padding: 8px 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 5px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  &:last-child {
    margin-left: 10px;
  }
`;
