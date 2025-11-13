import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

interface BottomTabBarProps {
  navigation: NavigationProp<RootStackParamList>;
  activeTab: 'jobs' | 'applications' | 'profile';
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, activeTab }) => {
  const { user } = useAuth();

  const handleJobsPress = () => {
    navigation.navigate('JobsList');
  };

  const handleMiddleTabPress = () => {
    if (user?.userType === 'company') {
      navigation.navigate('CreateJob');
    } else {
      navigation.navigate('Applications');
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('EditProfile');
  };

  const getMiddleTabIcon = () => {
    if (user?.userType === 'company') {
      return activeTab === 'applications' ? 'add-circle' : 'add-circle-outline';
    }
    return activeTab === 'applications' ? 'document-text' : 'document-text-outline';
  };

  const getMiddleTabLabel = () => {
    return user?.userType === 'company' ? 'Criar Vaga' : 'Candidaturas';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={handleJobsPress}
      >
        <Ionicons 
          name={activeTab === 'jobs' ? 'briefcase' : 'briefcase-outline'} 
          size={24} 
          color={activeTab === 'jobs' ? '#4A9EFF' : '#CCCCCC'} 
        />
        <Text style={[
          styles.tabLabel, 
          activeTab === 'jobs' && styles.activeTabLabel
        ]}>
          Vagas
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={handleMiddleTabPress}
      >
        <Ionicons 
          name={getMiddleTabIcon()} 
          size={24} 
          color={activeTab === 'applications' ? '#4A9EFF' : '#CCCCCC'} 
        />
        <Text style={[
          styles.tabLabel, 
          activeTab === 'applications' && styles.activeTabLabel
        ]}>
          {getMiddleTabLabel()}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem}
        onPress={handleProfilePress}
      >
        <Ionicons 
          name={activeTab === 'profile' ? 'person' : 'person-outline'} 
          size={24} 
          color={activeTab === 'profile' ? '#4A9EFF' : '#CCCCCC'} 
        />
        <Text style={[
          styles.tabLabel, 
          activeTab === 'profile' && styles.activeTabLabel
        ]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingTop: 16,
    paddingBottom: 34,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#4A9EFF',
    fontWeight: '600',
  },
});