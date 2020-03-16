import styled, { css } from 'styled-components';
import { darken } from 'polished';

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

export const StatusOrder = styled.span`
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  max-width: 120px;
  border-radius: 30px;
  background: ${props => props.color};
  color: ${props => darken(0.45, props.color)};
  font-size: 16px;
  font-weight: bold;
  position: relative;
  margin-left: 10px;

  &::before {
    ${css`
      content: '';
      border-radius: 50%;
      left: 5px;
      top: calc(5px + 10%);
      width: 10px;
      height: 10px;
      position: absolute;
      background: ${props => darken(0.45, props.color)};
    `}
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    svg {
      margin-right: 5px;
    }

    & + button {
      margin-top: 5px;
      border-top: 1px solid #eee;
    }
  }
`;
