import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Application {
  id: number;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: 'applied' | 'reviewing' | 'interview_scheduled' | 'interview_completed' | 'approved' | 'rejected' | 'withdrawn';
  compatibilityScore?: number;
  feedback?: string;
}

interface ApplicationCardProps {
  application: Application;
  onPress: () => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      case 'interview_scheduled':
        return '#FF9800';
      case 'interview_completed':
        return '#2196F3';
      case 'reviewing':
        return '#9C27B0';
      default:
        return '#607D8B';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'applied':
        return 'Aplicado';
      case 'reviewing':
        return 'Em Análise';
      case 'interview_scheduled':
        return 'Entrevista';
      case 'interview_completed':
        return 'Entrevista Realizada';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Não selecionado';
      case 'withdrawn':
        return 'Retirado';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      case 'interview_scheduled':
        return 'calendar';
      case 'interview_completed':
        return 'calendar-outline';
      case 'reviewing':
        return 'time-outline';
      default:
        return 'document-text-outline';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.companyInitial}>
          <Text style={styles.initialText}>
            {application.companyName.charAt(0).toUpperCase()}
          </Text>
        </View>
        
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle} numberOfLines={2}>
            {application.jobTitle}
          </Text>
          <Text style={styles.companyName}>{application.companyName}</Text>
          <Text style={styles.appliedDate}>
            Aplicado em {new Date(application.appliedAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) }]}>
          <Ionicons 
            name={getStatusIcon(application.status) as any} 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.statusText}>
            {getStatusLabel(application.status)}
          </Text>
        </View>
        
        {application.compatibilityScore && (
          <View style={styles.compatibilityContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.compatibilityText}>
              {application.compatibilityScore}% compatível
            </Text>
          </View>
        )}
      </View>

      {application.feedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Feedback:</Text>
          <Text style={styles.feedbackText} numberOfLines={2}>
            {application.feedback}
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Ver detalhes</Text>
          <Ionicons name="chevron-forward" size={16} color="#4A9EFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  companyInitial: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#4A9EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  initialText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 4,
  },
  appliedDate: {
    color: '#999999',
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  compatibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityText: {
    color: '#FFD700',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  feedbackContainer: {
    backgroundColor: '#3A3A3A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  feedbackLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  feedbackText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  footer: {
    alignItems: 'flex-end',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailButtonText: {
    color: '#4A9EFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});