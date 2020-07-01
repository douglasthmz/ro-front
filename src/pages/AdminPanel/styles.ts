import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const AdminContent = styled.div`
  max-width: 1000px;
  min-height: 500px;
  display: flex;
  margin: 100px auto 25px auto;
  flex-direction: column;
  box-shadow: 2px 2px 5px #00000029;
  border-radius: 8px;
  background-color: ${shade(0.01, '#f8f8ff')};
  align-items: center;
  color: #019dda;

  button.MuiTab-textColorPrimary {
    span {
      color: #666360;
    }
  }

  button.MuiTab-textColorPrimary.Mui-selected {
    span {
      color: #019dda !important;
    }
  }

  span.MuiTabs-indicator {
    background-color: #019dda !important;
  }
`;

export const FormContainer = styled.div`
  width: 100% !important;
  form {
    display: flex;
    max-width: 500px;
    margin: 25px auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    max-width: 500px;
    margin: 0 auto 40px auto;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #019dda;
  margin: 25px 0;
  text-align: center;
`;
