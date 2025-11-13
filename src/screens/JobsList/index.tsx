import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { JobCard } from '../../components/JobCard';
import { FilterTabs } from '../../components/FilterTabs';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useJobsList } from './hooks/useJobsList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Job } from '../../types/jobs';
import { styles } from './styles';

type JobsListScreenProps = NativeStackScreenProps<RootStackParamList, 'JobsList'>;

export const JobsListScreen: React.FC<JobsListScreenProps> = ({ navigation }) => {
  const {
    jobs,
    filteredJobs,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    userApplications,
  } = useJobsList();

  const handleJobPress = (jobId: string) => {
    navigation.navigate('JobDetails', { jobId });
  };



  const renderJobCard = ({ item }: { item: Job }) => (
    <JobCard 
      job={item} 
      onPress={() => handleJobPress(item.id)} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Vagas</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
        >
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por cargo ou empresa"
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filters */}
      <FilterTabs
        options={categories}
        selectedOption={selectedCategory}
        onSelectOption={setSelectedCategory}
      />

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
        onRefresh={() => {}}
        refreshing={loading}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {userApplications.length > 0 
                ? "Todas as vagas foram aplicadas!" 
                : "Nenhuma vaga encontrada"
              }
            </Text>
            <Text style={styles.emptySubtitle}>
              {userApplications.length > 0
                ? "Você já se candidatou a todas as vagas disponíveis. Verifique suas candidaturas na aba correspondente."
                : "Tente ajustar os filtros de busca ou categoria."
              }
            </Text>
          </View>
        )}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar navigation={navigation} activeTab="jobs" />
    </SafeAreaView>
  );
};
