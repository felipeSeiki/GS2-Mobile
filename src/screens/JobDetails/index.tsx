import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useJobDetails } from './hooks/useJobDetails';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

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
