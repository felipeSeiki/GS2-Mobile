import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../types/jobs';

interface JobCardProps {
  job: Job;
  onPress: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'briefcase-outline';
      case 'part-time':
        return 'time-outline';
      case 'contract':
        return 'document-text-outline';
      case 'internship':
        return 'school-outline';
      default:
        return 'briefcase-outline';
    }
  };

  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'Tempo Integral';
      case 'part-time':
        return 'Meio Período';
      case 'contract':
        return 'Contrato';
      case 'internship':
        return 'Estágio';
      default:
        return type;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <View style={styles.companyLogo}>
            <Text style={styles.companyInitial}>
              {job.company.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.jobTitle} numberOfLines={2}>
              {job.title}
            </Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons 
            name={getJobTypeIcon(job.type)} 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.detailText}>
            {getJobTypeLabel(job.type)}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#FFFFFF" />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        
        {job.salary && (
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#FFFFFF" />
            <Text style={styles.detailText}>
              {job.salary}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.skillsContainer}>
          {job.requirements && job.requirements.slice(0, 3).map((requirement: string, index: number) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{requirement}</Text>
            </View>
          ))}
          {job.requirements && job.requirements.length > 3 && (
            <Text style={styles.moreSkills}>+{job.requirements.length - 3}</Text>
          )}
        </View>
        
        <Text style={styles.postedDate}>
          {new Date(job.postedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  companyLogo: {
    width: 50,
    height: 50,
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
  titleContainer: {
    flex: 1,
  },
  jobTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  bookmarkButton: {
    padding: 8,
  },
  details: {
    marginBottom: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  skillTag: {
    backgroundColor: '#4A9EFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  moreSkills: {
    color: '#4A9EFF',
    fontSize: 12,
    fontWeight: '500',
  },
  postedDate: {
    color: '#999999',
    fontSize: 12,
  },
});