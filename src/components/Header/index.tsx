import React, { useState } from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { FiChevronsDown } from 'react-icons/fi';
import {
  AiOutlineDashboard,
  AiOutlineTool,
  AiOutlineLogout,
} from 'react-icons/ai';

import { useHistory } from 'react-router-dom';
import {
  Container,
  Content,
  LeftContent,
  RightContent,
  MenuButton,
  MenuItemContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

import HeaderLogo from '../../assets/header-logo.png';

const Header: React.FC = () => {
  const { admin, signOut } = useAuth();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  const handleAdmin = () => {
    handleClose();
    history.push('/adminpage');
  };

  const handleDashboard = () => {
    handleClose();
    history.push('/dashboard');
  };

  return (
    <Container>
      <Content>
        {admin && (
          <>
            <LeftContent onClick={() => history.push('/dashboard')}>
              <img src={HeaderLogo} alt="RedeGlobo" />
              <p>RELATÓRIO OPERACIONAL</p>
            </LeftContent>
            <RightContent>
              <div>
                <MenuButton
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <span>
                    Olá, <strong>{admin.name}</strong>
                  </span>
                  <FiChevronsDown size={18} />
                </MenuButton>
                <Menu
                  id="menu-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDashboard}>
                    <MenuItemContainer>
                      <AiOutlineDashboard /> DashBoard
                    </MenuItemContainer>
                  </MenuItem>
                  <MenuItem onClick={handleAdmin}>
                    <MenuItemContainer>
                      <AiOutlineTool /> Painel de admin
                    </MenuItemContainer>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <MenuItemContainer>
                      <AiOutlineLogout /> Sair
                    </MenuItemContainer>
                  </MenuItem>
                </Menu>
              </div>
            </RightContent>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Header;
