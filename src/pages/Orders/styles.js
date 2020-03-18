import styled, { css } from 'styled-components';
import { darken } from 'polished';

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
