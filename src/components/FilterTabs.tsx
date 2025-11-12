import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  const renderOption = ({ item, index }: { item: string, index: number }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        selectedOption === item && styles.selectedDropdownItem,
        index === options.length - 1 && styles.lastDropdownItem
      ]}
      onPress={() => handleSelectOption(item)}
    >
      <Text style={[
        styles.dropdownItemText,
        selectedOption === item && styles.selectedDropdownItemText
      ]}>
        {item}
      </Text>
      {selectedOption === item && (
        <Ionicons name="checkmark" size={20} color="#4A9EFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropdownText}>{selectedOption}</Text>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={options}
              renderItem={({ item, index }) => renderOption({ item, index })}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    marginHorizontal: 20,
    maxHeight: 300,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  selectedDropdownItem: {
    backgroundColor: 'rgba(74, 158, 255, 0.1)',
  },
  dropdownItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedDropdownItemText: {
    color: '#4A9EFF',
    fontWeight: '600',
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
});