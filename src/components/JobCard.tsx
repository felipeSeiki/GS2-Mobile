import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  skills: string[];
  postedAt: string;
}

interface JobCardProps {
  job: Job;
  onPress: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  const formatSalary = (min: number, max: number, currency: string = 'BRL') => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const getWorkTypeIcon = (workType: string) => {
    switch (workType) {
      case 'remote':
        return 'home-outline';
      case 'hybrid':
        return 'business-outline';
      case 'onsite':
        return 'location-outline';
      default:
        return 'briefcase-outline';
    }
  };

  const getWorkTypeLabel = (workType: string) => {
    switch (workType) {
      case 'remote':
        return 'Remoto';
      case 'hybrid':
        return 'Híbrido';
      case 'onsite':
        return 'Presencial';
      default:
        return workType;
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
            name={getWorkTypeIcon(job.workType)} 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.detailText}>
            {getWorkTypeLabel(job.workType)}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#FFFFFF" />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        
        {job.salaryMin && job.salaryMax && (
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#FFFFFF" />
            <Text style={styles.detailText}>
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.skillsContainer}>
          {job.skills.slice(0, 3).map((skill: string, index: number) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {job.skills.length > 3 && (
            <Text style={styles.moreSkills}>+{job.skills.length - 3}</Text>
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
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3A3A3A',
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
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  },
  skillTag: {
    backgroundColor: '#4A9EFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  moreSkills: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  postedDate: {
    color: '#999999',
    fontSize: 12,
  },
});