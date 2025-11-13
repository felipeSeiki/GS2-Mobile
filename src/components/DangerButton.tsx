import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface DangerButtonProps extends TouchableOpacityProps {
  title: string;
  fullWidth?: boolean;
}

export const DangerButton: React.FC<DangerButtonProps> = ({ 
  title, 
  fullWidth = false,
  style, 
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    fullWidth && styles.fullWidth,
    style
  ];

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});