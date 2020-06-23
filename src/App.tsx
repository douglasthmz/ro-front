import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>

        <GlobalStyle />
      </Router>
    </>
  );
};
export default App;
