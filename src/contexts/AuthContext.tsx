import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, User, LoginCredentials, RegisterData } from '../services';

// Chaves de armazenamento
const STORAGE_KEYS = {
  USER: '@JobApp:user',
  TOKEN: '@JobApp:token',
  LAST_AUTH_RESPONSE: '@JobApp:lastAuthResponse',
};

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    try {
      const user = await AuthService.login(credentials);

      setUser(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      
      // Salva resposta para debug
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_AUTH_RESPONSE, JSON.stringify(user));
      } catch (e) {
        console.warn('Não foi possível salvar last auth response:', e);
      }
    } catch (error) {
      console.error('Erro no signIn:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const user = await AuthService.register(data);

      setUser(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      
      // Salva resposta para debug
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_AUTH_RESPONSE, JSON.stringify(user));
      } catch (e) {
        console.warn('Não foi possível salvar last auth response (register):', e);
      }
    } catch (error) {
      console.error('Erro no register:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
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