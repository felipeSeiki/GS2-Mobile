import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ApplicationCard } from '../../components/ApplicationCard';
import { BottomTabBar } from '../../components/BottomTabBar';
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
      <BottomTabBar navigation={navigation} activeTab="applications" />
    </SafeAreaView>
  );
};
