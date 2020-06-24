import React, { useCallback } from 'react';

import {
  Container,
  Content,
  LeftContent,
  RightContent,
  SignOutButton,
} from './styles';
import { useAuth } from '../../hooks/auth';

import HeaderLogo from '../../assets/header-logo.png';

const Header: React.FC = () => {
  const { admin, signOut } = useAuth();
  console.log(admin);

  return (
    <Container>
      <Content>
        {admin && (
          <>
            <LeftContent>
              <img src={HeaderLogo} alt="RedeGlobo" />
              <p>RELATÓRIO OPERACIONAL</p>
            </LeftContent>
            <RightContent>
              <p>
                Olá, <strong>{admin.name}</strong>
              </p>
              <SignOutButton type="button" onClick={() => signOut()}>
                SAIR
              </SignOutButton>
            </RightContent>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Header;
