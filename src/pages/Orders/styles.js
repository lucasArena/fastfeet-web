import styled from 'styled-components';

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

export const ActionButton = styled.div`
  background: #fff;
  box-shadow: 0 1px 0 rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3;
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  margin-top: 20px;
  z-index: 2;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;

  button {
    padding: 10px;
    & + button {
      margin-top: 5px;
      border-top: 1px solid #eee;
    }

    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    svg {
      margin-right: 5px;
    }
  }
`;
