import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, User, LoginCredentials, RegisterData } from '../services/authService';

// AuthContext usando o AuthService unificado

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  clearStorage: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await AuthService.initialize();
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Erro ao inicializar auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    try {
      const user = await AuthService.login(credentials);
      setUser(user);
    } catch (error) {
      console.error('Erro no signIn:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const user = await AuthService.register(data);
      setUser(user);
    } catch (error) {
      console.error('Erro no register:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const clearStorage = async () => {
    try {
      console.log('🧹 Limpando AsyncStorage...');
      await AuthService.clearStorage();
      setUser(null);
      
      console.log('✅ AsyncStorage limpo com sucesso!');
      console.log('ℹ️ Reinicie o app para ver os dados originais dos mocks');
    } catch (error) {
      console.error('❌ Erro ao limpar AsyncStorage:', error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        register, 
        signOut,
        clearStorage,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 