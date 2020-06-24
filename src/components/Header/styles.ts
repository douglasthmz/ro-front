import styled from 'styled-components';
import { AppBar, Toolbar } from '@material-ui/core';

export const Container = styled(AppBar)`
  background-color: #019dda !important;
`;

export const Content = styled(Toolbar)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  img {
    height: 53px;
    width: 53px;
    margin-right: 20px;
  }
`;
export const RightContent = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 50px;
  }
`;
export const SignOutButton = styled.button`
  border: 0;
  background: none;
  color: #f8f8ff;
  font-weight: 500;
`;
