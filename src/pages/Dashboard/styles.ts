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

  ::-webkit-scrollbar-button:single-button {
    background-color: #dfdfdf;
    display: block;
    border-style: solid;
    height: 12px;
    width: 18px;
  }

  ::-webkit-scrollbar-button:single-button:horizontal:decrement {
    border-width: 6px 9px 6px 0px;
    border-color: #f8f8ff #555555 #f8f8ff #f8f8ff;
  }

  ::-webkit-scrollbar-button:single-button:horizontal:decrement:hover {
    border-color: #f8f8ff #777777 #f8f8ff #f8f8ff;
  }

  ::-webkit-scrollbar-button:single-button:horizontal:increment {
    border-width: 6px 0px 6px 9px;
    border-color: #f8f8ff #f8f8ff #f8f8ff #555555;
  }

  ::-webkit-scrollbar-button:horizontal:single-button:increment:hover {
    border-color: #f8f8ff #f8f8ff #f8f8ff #777777;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #019dda;
    border-radius: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #dfdfdf;
  }
`;

export const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 400px;
  box-shadow: 2px 2px 5px #00000029;
  border-radius: 8px;
  background-color: ${shade(0.01, '#f8f8ff')};
  margin-top: 20px;
  color: #585858;
  text-transform: uppercase;

  & + & {
    margin-left: 50px;
  }

  &:hover {
    background-color: ${shade(0.03, '#f8f8ff')};
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

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    width: 124px;
    height: 124px;
  }
`;
export const CardProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
  }
`;
export const CardBody = styled.div`
  margin-top: 30px;
`;
export const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a2a2a2;
  margin: 0 6px;
  h3 {
    display: flex;
    width: 50%;
    padding-bottom: 10px;
    margin: 0 6px 3px 6px;
  }
  h3 + h3 {
    display: flex;
    width: 50%;
    justify-content: center;
    border-left: 1px solid #a2a2a2;
  }

  & + & {
    margin-top: 10px;
  }
`;
export const CardFooter = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: flex-end;
  justify-content: center;
`;
