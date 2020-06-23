import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 140px;
    height: 140px;
    margin-bottom: 25px;
  }
`;

export const AppTitle = styled.h1`
  font-size: 36px;
  color: #019dda;
  font-weight: 700;
  margin-bottom: 25px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  box-shadow: 2px 2px 3px #00000029;
  border-radius: 8px;
  background-color: ${shade(0.01, '#f8f8ff')};
  align-items: center;
  justify-content: space-around;
  color: #019dda;

  p {
    font-size: 24px;
    font-weight: 500;
    margin-top: 10px;
  }
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  a {
    display: block;
    text-decoration: none;
    color: #019dda;
    font-size: 14px;

    &:hover {
      color: ${shade(0.2, '#019dda')};
    }
  }
`;
