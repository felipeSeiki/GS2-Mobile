import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { CompatibilityAnalysis } from '../../components/CompatibilityAnalysis';
import { useJobDetails } from './hooks/useJobDetails';
import { useCompatibilityAnalysis } from './hooks/useCompatibilityAnalysis';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

type JobDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'JobDetails'>;

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ navigation, route }) => {
  const { jobId } = route.params;
  const { user } = useAuth();
  const { job, loading, handleApply, handleEdit, hasApplied, checkingApplication, isCandidate, isOwnerCompany } = useJobDetails(jobId, navigation);
  
  // Hook para análise de compatibilidade com IA (apenas para candidatos)
  const { 
    analysis, 
    loading: analysisLoading, 
    error: analysisError 
  } = useCompatibilityAnalysis(
    isCandidate ? job : null, // Só analisa se for candidato
    isCandidate ? user : null
  );

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
              <Text style={styles.jobLocation}>{job.location}</Text>
            </View>
          </View>

          {/* Informações básicas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações da Vaga</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Categoria:</Text>
                <Text style={styles.infoValue}>{job.category}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Tipo:</Text>
                <Text style={styles.infoValue}>
                  {job.type === 'full-time' ? 'CLT' : 
                   job.type === 'part-time' ? 'Freelancer' :
                   job.type === 'contract' ? 'PJ' : 'Estágio'}
                </Text>
              </View>
            </View>
            {job.salary && (
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Salário:</Text>
                  <Text style={styles.infoValue}>{job.salary}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Descrição */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{job.description}</Text>
          </View>

          {/* Requisitos */}
          {job.requirements && job.requirements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requisitos</Text>
              {job.requirements.map((requirement, index) => (
                <View key={index} style={styles.requirementItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.requirementText}>{requirement}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Análise de Compatibilidade com IA - Apenas para candidatos */}
          {isCandidate && (
            <CompatibilityAnalysis
              analysis={analysis}
              loading={analysisLoading}
              error={analysisError}
            />
          )}

        </View>
      </ScrollView>

      {/* Botão de candidatura - só aparece para candidatos */}
      {isCandidate && (
        <View style={styles.bottomContainer}>
          <Button
            title={hasApplied ? "Já Candidatado" : "Candidatar-se"}
            onPress={handleApply}
            fullWidth
            size="large"
            disabled={hasApplied || checkingApplication}
            style={hasApplied ? styles.appliedButton : undefined}
          />
        </View>
      )}

      {/* Botão de editar - só aparece para empresa dona da vaga */}
      {isOwnerCompany && (
        <View style={styles.bottomContainer}>
          <Button
            title="Editar Vaga"
            onPress={handleEdit}
            fullWidth
            size="large"
            style={styles.editButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
