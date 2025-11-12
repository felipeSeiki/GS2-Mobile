import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { FilterTabs } from '../../components/FilterTabs';
import { ApplicationCard } from '../../components/ApplicationCard';
import { useApplications } from './hooks/useApplications';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type ApplicationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Applications'>;

const filterOptions = [
  { label: 'Todas', value: 'all' },
  { label: 'Ativas', value: 'active' },
  { label: 'Finalizadas', value: 'finished' },
];

export const ApplicationsScreen: React.FC<ApplicationsScreenProps> = ({ navigation }) => {
  const { 
    applications, 
    filteredApplications, 
    selectedFilter, 
    setSelectedFilter,
    loading 
  } = useApplications();

  const renderApplicationItem = ({ item }: { item: any }) => (
    <ApplicationCard
      application={item}
      onPress={() => {
        // Navegar para detalhes da vaga se necessário
        navigation.navigate('JobDetails', { jobId: item.job.id });
      }}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Nenhuma candidatura encontrada</Text>
      <Text style={styles.emptySubtitle}>
        {selectedFilter === 'all' 
          ? 'Você ainda não se candidatou a nenhuma vaga.'
          : `Você não possui candidaturas ${selectedFilter === 'active' ? 'ativas' : 'finalizadas'}.`
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Minhas Candidaturas" />
      
      <View style={styles.content}>
        <FilterTabs
          options={filterOptions.map(option => option.label)}
          selectedOption={selectedFilter}
          onSelectOption={setSelectedFilter}
        />

        <FlatList
          data={filteredApplications}
          keyExtractor={(item) => item.id}
          renderItem={renderApplicationItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
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
});
