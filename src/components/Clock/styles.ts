import styled, { css } from 'styled-components';

interface ContainerProps {
  isTimer?: boolean;
  isLive?: boolean;
  isFinished?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px #00000029;
  width: 100%;
  height: 40px;
  /* margin: 0 auto; */
  font-weight: 500;
  font-size: 18px;
  border-radius: 4px;

  ${(props) =>
    props.isFinished &&
    css`
      background-color: #308a3f;
      color: #f8f8ff;
    `}
  ${(props) =>
    props.isLive &&
    css`
      background-color: #c53030;
      color: #f8f8ff;
    `}

    ${(props) =>
      props.isTimer &&
      css`
        background-color: #f8f8ff;
        font-size: 20px;
      `}
`;
