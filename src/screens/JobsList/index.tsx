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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
        onRefresh={() => {}}
        refreshing={loading}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar navigation={navigation} activeTab="jobs" />
    </SafeAreaView>
  );
};
