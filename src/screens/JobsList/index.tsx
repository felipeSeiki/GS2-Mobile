import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { JobCard } from '../../components/JobCard';
import { FilterTabs } from '../../components/FilterTabs';
import { useJobsList } from './hooks/useJobsList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
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
  } = useJobsList();

  const handleJobPress = (jobId: number) => {
    navigation.navigate('JobDetails', { jobId: jobId.toString() });
  };

  const handleNavigateToApplications = () => {
    navigation.navigate('Applications');
  };

  const renderJobCard = ({ item }: { item: any }) => (
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
          onPress={handleNavigateToApplications}
        >
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#CCCCCC" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por cargo ou empresa"
            placeholderTextColor="#CCCCCC"
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
        onRefresh={() => {}}
        refreshing={loading}
      />

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="briefcase" size={24} color="#4A9EFF" />
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Vagas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={handleNavigateToApplications}
        >
          <Ionicons name="document-text-outline" size={24} color="#CCCCCC" />
          <Text style={styles.tabLabel}>Candidaturas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#CCCCCC" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
