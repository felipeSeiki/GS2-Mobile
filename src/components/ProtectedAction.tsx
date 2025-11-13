import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';

interface ProtectedActionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showLoginPrompt?: boolean;
  customMessage?: string;
  onUnauthorizedAction?: () => void;
}

/**
 * Componente para proteger ações específicas dentro das telas
 * Útil para botões, links ou qualquer elemento que requer autenticação
 */
export const ProtectedAction: React.FC<ProtectedActionProps> = ({
  children,
  fallback,
  showLoginPrompt = true,
  customMessage,
  onUnauthorizedAction,
}) => {
  const { isAuthenticated } = useAuth();
  const { navigateToPublic } = useProtectedNavigation();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showLoginPrompt) {
    return (
      <View style={styles.container}>
        <View style={styles.promptContainer}>
          <Ionicons name="lock-closed" size={32} color="#4A9EFF" style={styles.icon} />
          <Text style={styles.title}>Acesso Restrito</Text>
          <Text style={styles.message}>
            {customMessage || 'Você precisa estar logado para acessar esta funcionalidade.'}
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              if (onUnauthorizedAction) {
                onUnauthorizedAction();
              } else {
                navigateToPublic('Login');
              }
            }}
          >
            <Text style={styles.loginButtonText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

interface ProtectedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  variant?: 'primary' | 'outline';
}

/**
 * Botão que automaticamente mostra prompt de login se usuário não estiver autenticado
 */
export const ProtectedButton: React.FC<ProtectedButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  variant = 'primary',
}) => {
  const { isAuthenticated } = useAuth();
  const { navigateToPublic } = useProtectedNavigation();

  const handlePress = () => {
    if (isAuthenticated) {
      onPress();
    } else {
      navigateToPublic('Login');
    }
  };

  const buttonStyle = [
    styles.button,
    variant === 'outline' ? styles.outlineButton : styles.primaryButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'outline' ? styles.outlineButtonText : styles.primaryButtonText,
    disabled && styles.disabledButtonText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={textStyle}>
        {isAuthenticated ? title : 'Fazer Login para ' + title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  promptContainer: {
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 24,
    maxWidth: 320,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#4A9EFF',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 120,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Estilos para ProtectedButton
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: '#4A9EFF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4A9EFF',
  },
  disabledButton: {
    backgroundColor: '#555555',
    borderColor: '#555555',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  outlineButtonText: {
    color: '#4A9EFF',
  },
  disabledButtonText: {
    color: '#999999',
  },
});