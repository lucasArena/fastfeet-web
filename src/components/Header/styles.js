import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      margin: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    margin: 50px;

    strong {
      text-align: right;
      letter-spacing: 0;
      color: #666666;
    }

    button {
      background: none;
      text-decoration: none;
      margin-top: 5px;
      color: #de3b3b;
      text-align: right;
    }
  }
`;

export const NavButton = styled(Link)`
  margin-right: 20px;
  font-weight: bold;
  text-decoration: none;
  text-align: left;
  letter-spacing: 0;
  color: ${props => (props.selected ? '#444444' : '#999999')};
  opacity: 1;
  text-transform: uppercase;
`;
