import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  admin: AdminData;
}

interface AdminData {
  created_at: Date;
  updated_at: Date;
  id: string;
  name: string;
  role: object;
  role_id: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  admin: AdminData;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Relatorio:token');
    const admin = localStorage.getItem('@Relatorio:admin');

    if (token && admin) {
      return {
        token,
        admin: JSON.parse(admin),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, admin } = response.data;

    localStorage.setItem('@Relatorio:token', token);
    localStorage.setItem('@Relatorio:admin', JSON.stringify(admin));

    setData({ token, admin });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Relatorio:token');
    localStorage.removeItem('@Relatorio:admin');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ admin: data.admin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
