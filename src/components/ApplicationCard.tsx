import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Application } from '../types';

interface ApplicationCardProps {
  application: Application;
  onPress: () => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50'; // Verde
      case 'rejected':
        return '#F44336'; // Vermelho
      case 'reviewing':
        return '#FF9800'; // Laranja
      case 'pending':
        return '#2196F3'; // Azul
      default:
        return '#9E9E9E'; // Cinza
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Não selecionado';
      case 'reviewing':
        return 'Em Análise';
      case 'approved':
        return 'Aplicado';
      case 'rejected':
        return 'Entrevista';
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {application.job.title}
        </Text>
        
        <Text style={[styles.statusText, { color: getStatusColor(application.status) }]}>
          {getStatusLabel(application.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});