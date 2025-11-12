import React, { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: any;
}

export const Input = forwardRef<TextInput, InputProps>(({ 
  label, 
  error, 
  icon, 
  containerStyle,
  style,
  ...props 
}, ref) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={theme.colors.text} 
            style={styles.icon}
          />
        )}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            icon && styles.inputWithIcon,
            error && styles.inputError,
            style
          ]}
          placeholderTextColor={theme.colors.text}
          {...props}
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    flex: 1,
  },
  inputWithIcon: {
    paddingLeft: 50,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  icon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  },
});
