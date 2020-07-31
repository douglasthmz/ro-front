import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ExibitionProvider } from './exibition';
import { ProductsProvider } from './products';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ProductsProvider>
      <ExibitionProvider>
        <ToastProvider>{children}</ToastProvider>
      </ExibitionProvider>
    </ProductsProvider>
  </AuthProvider>
);

export default AppProvider;
