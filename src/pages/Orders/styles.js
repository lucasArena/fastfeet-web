import styled, { css } from 'styled-components';

export const Table = styled.table`
  margin-top: 30px;
  tbody {
    tr {
      background: #fff;
      td {
        padding: 20px 25px;
        text-align: center;

        button {
          background: none;
          position: relative;

          &::after {
            ${css`
              content: '';
              display: block;
              position: absolute;
              width: 90px;
              height: 90px;
              left: calc(50% - 45px);
              background: red;
            `}
          }
        }
      }
    }
  }
`;
