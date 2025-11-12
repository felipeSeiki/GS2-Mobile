import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useJobDetails } from './hooks/useJobDetails';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type JobDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'JobDetails'>;

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ navigation, route }) => {
  const { jobId } = route.params;
  const { job, loading, handleApply } = useJobDetails(jobId);

  if (loading || !job) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="Carregando..."
          showBackButton 
          onBackPress={() => navigation.goBack()} 
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando detalhes da vaga...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Detalhes da Vaga"
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.jobHeader}>
            <View style={styles.companyLogo}>
              <Text style={styles.companyInitial}>
                {job.company.charAt(0).toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.jobTitleContainer}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.description}>
              Estamos procurando um(a) {job.title} talentoso(a) e 
              apaixonado(a) por tecnologia para se juntar à nossa equipe altamente qualificada. 
              Você será responsável por projetar, desenvolver e manter aplicações web de 
              alta performance, utilizando as mais recentes tecnologias do mercado.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button
          title="Candidatar-se"
          onPress={handleApply}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  jobHeader: {
    flexDirection: 'row',
    paddingVertical: 24,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#4A9EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  companyInitial: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 32,
  },
  companyName: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
});
