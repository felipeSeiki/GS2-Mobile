import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import theme from '../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled, 
  style, 
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) && styles.disabledText
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />}
      <Text style={textStyle}>
        {loading ? 'Carregando...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  outlineText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: theme.colors.secondary,
    opacity: 0.6,
  },
  disabledText: {
    color: '#FFFFFF',
  },
  loader: {
    marginRight: 8,
  },
});
