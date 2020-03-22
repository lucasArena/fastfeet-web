import styled from 'styled-components';

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
    flex: 1;
  }
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: ${props => (props.width ? props.width : '100%')};
`;
