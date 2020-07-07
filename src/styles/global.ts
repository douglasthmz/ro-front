import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    background: #f8f8ff;
    -webkit-font-smoothing: antialiased;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #a2a2a2;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background-color: #f8f8ff;
    }
  }

  body, input, button{
    font-family: 'Roboto', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6{
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }
`;
