import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface FilterTabsProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selectedOption === option && styles.selectedTab
          ]}
          onPress={() => onSelectOption(option)}
        >
          <Text style={[
            styles.tabText,
            selectedOption === option && styles.selectedTabText
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  selectedTab: {
    backgroundColor: '#4A9EFF',
    borderColor: '#4A9EFF',
  },
  tabText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});