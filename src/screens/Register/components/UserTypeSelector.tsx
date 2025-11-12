import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface UserTypeSelectorProps {
  userType: 'candidate' | 'company';
  onUserTypeChange: (type: 'candidate' | 'company') => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  userType,
  onUserTypeChange,
}) => {
  return (
    <View style={styles.userTypeContainer}>
      <Text style={styles.userTypeLabel}>Tipo de Cadastro</Text>
      <View style={styles.userTypeButtons}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'candidate' && styles.userTypeButtonActive,
          ]}
          onPress={() => onUserTypeChange('candidate')}
        >
          <Text
            style={[
              styles.userTypeButtonText,
              userType === 'candidate' && styles.userTypeButtonTextActive,
            ]}
          >
            Candidato
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'company' && styles.userTypeButtonActive,
          ]}
          onPress={() => onUserTypeChange('company')}
        >
          <Text
            style={[
              styles.userTypeButtonText,
              userType === 'company' && styles.userTypeButtonTextActive,
            ]}
          >
            Empresa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};