import React from 'react';

import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';

import HeaderLogo from '../../assets/header-logo.png';

const Header: React.FC = () => {
  const { admin } = useAuth();

  return (
    <Container>
      <Content>
        {/* <LeftContent>
          <img src={HeaderLogo} alt="RedeGlobo"/>
        </LeftContent>
        <RightContent>

        </RightContent> */}
      </Content>
    </Container>
  );
};

export default Header;
