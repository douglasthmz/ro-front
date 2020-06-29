import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex !important;
  height: 100% !important;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const AdminContent = styled.div`
  max-width: 1000px;
  height: 80%;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px #00000029;
  border-radius: 8px;
  background-color: ${shade(0.01, '#f8f8ff')};
  align-items: center;
  color: #019dda;
  margin-top: 25px;

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

  span.PrivateTabIndicator-colorPrimary-2 {
    background-color: #019dda !important;
  }
`;
