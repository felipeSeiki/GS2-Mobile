import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ApplicationCard } from '../../components/ApplicationCard';
import { useApplications } from './hooks/useApplications';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type ApplicationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Applications'>;

export const ApplicationsScreen: React.FC<ApplicationsScreenProps> = ({ navigation }) => {
  const { applications, loading } = useApplications();

  const renderApplicationItem = ({ item }: { item: any }) => (
    <ApplicationCard
      application={item}
      onPress={() => {
        navigation.navigate('JobDetails', { jobId: item.job.id });
      }}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Nenhuma candidatura encontrada</Text>
      <Text style={styles.emptySubtitle}>
        Você ainda não se candidatou a nenhuma vaga.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Candidaturas</Text>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          renderItem={renderApplicationItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('JobsList')}
        >
          <Ionicons name="briefcase-outline" size={24} color="#666666" />
          <Text style={styles.navLabel}>Vagas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => {}} // Já está na tela atual
        >
          <Ionicons name="document-text" size={24} color="#4A9EFF" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Candidaturas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}} // Implementar navegação para perfil
        >
          <Ionicons name="person-outline" size={24} color="#666666" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    // Estilo adicional para item ativo
  },
  navLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  navLabelActive: {
    color: '#4A9EFF',
  },
});
