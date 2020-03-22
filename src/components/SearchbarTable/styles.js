import styled from 'styled-components';

export const Container = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    input {
      padding: 10px 15px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      color: #999;
    }

    a {
      display: ${props => (props.showButtons ? 'block' : 'none')};
      text-decoration: none;
    }

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: #7d40e7 0% 0% no-repeat padding-box;
      border-radius: 4px;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      padding: 10px 20px;

      svg {
        margin-right: 5px;
      }
    }
  }
`;
