import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  box-shadow: 0 1px 0 rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3;
  position: absolute;
  min-width: 150px;
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
