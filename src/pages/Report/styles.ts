import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Clock from '../../components/Clock';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 90px 15px 15px 15px;
`;

export const HeaderContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 200px;
  background-color: ${shade(0.015, '#f8f8ff')};
  box-shadow: 2px 2px 5px #00000029;
  border-radius: 18px;
`;

export const HeaderLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  height: 100%;
  padding-left: 20px;
`;
export const HeaderAction = styled.div`
  width: 193px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-top: 5px;
`;
export const HeaderData = styled.div`
  display: flex;
  flex-direction: column;
  width: 36%;
  margin-left: 25px;
  justify-content: space-around;
  align-items: center;
  padding-right: 15px;
`;
export const ProductShow = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 14px;
  text-transform: uppercase;
  img {
    border-radius: 50%;
    width: 128px;
    height: 128px;
    position: absolute;
    left: 30px;
  }

  div {
    background-color: #019eda;
    color: #f8f8ff;
    border-radius: 10px;
    height: 95%;
    padding: 3px 30px;
    margin-left: 130px;
    text-align: center;
    h1 {
      font-size: 22px;
      margin: 5px 0;
    }
  }
`;

interface ReportProp {
  isDone?: boolean;
}

export const ReportStatus = styled.div<ReportProp>`
  display: flex;
  flex-direction: row;
  height: 50%;
  align-items: center;
  margin-left: 30px;
  p {
    margin-left: 10px;
    color: #585858;
  }
  h1 {
    margin-left: 20px;
    font-size: 26px;
    color: #308a3f;

    ${(props) =>
      !props.isDone &&
      css`
        color: #c53030;
      `}
  }
`;
export const FinishButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 72px;
  width: 193px;
  border-radius: 10px;
  color: #f8f8ff;
  border: none;
  background-color: green;
  font-weight: 500;
  font-size: 18px;
  justify-content: space-around;
  align-items: center;
  text-transform: uppercase;
  p {
    max-width: 50%;
  }
`;
export const SendMail = styled.button`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 72px;
  width: 193px;
  border-radius: 10px;
  border: none;
  background-color: green;
  color: #f8f8ff;
  font-weight: 500;
  font-size: 18px;
  justify-content: space-around;
  align-items: center;
  text-transform: uppercase;
  p {
    max-width: 50%;
  }
`;
export const Calendar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  form {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  p {
    color: #585858;
    margin-bottom: 6px;
  }
`;
export const DayWeek = styled.div`
  border: 3px solid #d3d3d3;
  border-radius: 8px;
  width: 50%;
  margin-left: 15px;
  margin-top: 3px;
  padding: 15px;
  text-align: center;
  color: #585858;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 19px;
`;

export const ReportClock = styled(Clock)``;
