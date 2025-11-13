import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        return 'Pendente';
      case 'reviewing':
        return 'Em Análise';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
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
      case 'reviewing':
        return 'time';
      case 'pending':
        return 'hourglass';
      default:
        return 'help-circle';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getCompanyInitial = (companyName: string) => {
    return companyName.charAt(0).toUpperCase();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.cardContent}>
        {/* Header com logo da empresa e status */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <View style={styles.companyLogo}>
              <Text style={styles.companyInitial}>
                {getCompanyInitial(application.job.company)}
              </Text>
            </View>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle} numberOfLines={1}>
                {application.job.title}
              </Text>
              <Text style={styles.companyName} numberOfLines={1}>
                {application.job.company}
              </Text>
            </View>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) + '20' }]}>
            <Ionicons 
              name={getStatusIcon(application.status) as any} 
              size={16} 
              color={getStatusColor(application.status)} 
            />
            <Text style={[styles.statusText, { color: getStatusColor(application.status) }]}>
              {getStatusLabel(application.status)}
            </Text>
          </View>
        </View>

        {/* Informações detalhadas */}
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#A0A0A0" />
            <Text style={styles.detailText}>{application.job.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="briefcase-outline" size={16} color="#A0A0A0" />
            <Text style={styles.detailText}>{application.job.category}</Text>
          </View>

          {application.job.salary && (
            <View style={styles.detailRow}>
              <Ionicons name="card-outline" size={16} color="#A0A0A0" />
              <Text style={styles.detailText}>{application.job.salary}</Text>
            </View>
          )}
        </View>

        {/* Footer com data de aplicação */}
        <View style={styles.footer}>
          <Text style={styles.appliedDate}>
            Aplicado em {formatDate(application.appliedAt)}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  cardContent: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#4A9EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  details: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
  },
  appliedDate: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '500',
  },
});