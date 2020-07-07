import React from 'react';

import {
  Container,
  DayPartContainer,
  ProductCard,
  DayPartTitle,
} from './styles';

const Dashboard: React.FC = () => (
  <Container>
    <DayPartTitle>
      <span>Manhã</span>
    </DayPartTitle>

    <DayPartContainer>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
    </DayPartContainer>

    <DayPartTitle>
      {' '}
      <span>Tarde</span>
    </DayPartTitle>

    <DayPartContainer>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
    </DayPartContainer>

    <DayPartTitle>
      {' '}
      <span>Noite</span>
    </DayPartTitle>

    <DayPartContainer>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
      <ProductCard>
        <h1>DashBoard</h1>
      </ProductCard>
    </DayPartContainer>
  </Container>
);

export default Dashboard;
