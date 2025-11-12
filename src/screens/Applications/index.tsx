import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ApplicationCard } from '../../components/ApplicationCard';
import { useApplications } from './hooks/useApplications';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

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
          onPress={() => {}} 
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
