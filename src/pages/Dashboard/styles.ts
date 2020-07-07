import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 80px 15px 15px 15px;
`;

export const DayPartContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    height: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #019dda;
    border-radius: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #dfdfdf;
    border-radius: 12px;
  }
`;

export const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 400px;
  box-shadow: 2px 2px 5px #00000029;
  border-radius: 8px;
  background-color: ${shade(0.01, '#f8f8ff')};
  align-items: center;
  margin-top: 20px;
  & + & {
    margin-left: 50px;
  }
`;

export const DayPartTitle = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 1.5px solid #a2a2a2;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  line-height: 20px;
  span {
    margin-bottom: 10px;
    color: #a2a2a2;
    font-weight: 500;
  }
`;
