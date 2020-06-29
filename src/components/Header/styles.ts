import styled from 'styled-components';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { shade } from 'polished';

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
  div {
    margin-right: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const MenuButton = styled(Button)`
  border: 0 !important;
  background: none !important;
  color: #f8f8ff !important;
  font-weight: 500 !important;
  text-transform: none !important;
  font-size: 16px !important;
  transition: background-color 0.2s !important;

  &:hover {
    background-color: ${shade(0.2, '#019dda')} !important;
  }

  svg {
    margin-left: 5px;
  }
`;

export const MenuItemContainer = styled.div`
  svg {
    margin-right: 3px !important;
  }
`;
