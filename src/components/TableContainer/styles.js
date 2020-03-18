import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 100px;
  width: 100%;
`;

export const Table = styled.table.attrs({
  cellspacing: 0,
})`
  margin-top: 30px;
  tbody {
    background: #fff;

    tr {
      margin-bottom: 10px;
      td {
        padding: 20px 25px;
        text-align: center;
        position: relative;
        border: 0;

        button {
          background: none;
          position: relative;
        }
      }
    }
  }
`;
