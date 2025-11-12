import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useCreateJob } from './hooks/useCreateJob';
import { styles } from './styles';
import { CreateJobScreenProps } from './type/type';

const contractTypes = [
  { label: 'CLT', value: 'full-time' },
  { label: 'PJ', value: 'contract' },
  { label: 'Estágio', value: 'internship' },
  { label: 'Freelancer', value: 'part-time' },
];

export const CreateJobScreen: React.FC<CreateJobScreenProps> = ({ navigation }) => {
  const {
    title,
    setTitle, 
    description,
    setDescription,
    requirements,
    setRequirements,
    location,
    setLocation,
    contractType,
    setContractType,
    salary,
    setSalary,
    category,
    setCategory,
    loading,
    handleCreateJob,
    showContractDropdown,
    setShowContractDropdown,
  } = useCreateJob(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Publicar Nova Vaga"
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Título da Vaga */}
          <View style={styles.section}>
            <Text style={styles.label}>Título da Vaga</Text>
            <Input
              placeholder="Ex: Desenvolvedor(a) de Software Pleno"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>

          {/* Descrição Breve da Vaga */}
          <View style={styles.section}>
            <Text style={styles.label}>Descrição Breve da Vaga</Text>
            <Input
              placeholder="Descreva as principais responsabilidades do cargo..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
            />
          </View>

          {/* Requisitos */}
          <View style={styles.section}>
            <Text style={styles.label}>Requisitos</Text>
            <Input
              placeholder="Liste as habilidades e experiências necessárias..."
              value={requirements}
              onChangeText={setRequirements}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
            />
          </View>

          {/* Localização */}
          <View style={styles.section}>
            <Text style={styles.label}>Localização</Text>
            <Input
              placeholder="Ex: São Paulo, SP ou Remoto"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
          </View>

          {/* Categoria */}
          <View style={styles.section}>
            <Text style={styles.label}>Categoria</Text>
            <Input
              placeholder="Ex: Desenvolvimento, Design, Marketing"
              value={category}
              onChangeText={setCategory}
              style={styles.input}
            />
          </View>

          {/* Salário */}
          <View style={styles.section}>
            <Text style={styles.label}>Salário (opcional)</Text>
            <Input
              placeholder="Ex: R$ 5.000 - R$ 8.000"
              value={salary}
              onChangeText={setSalary}
              style={styles.input}
            />
          </View>

          {/* Tipo de Contrato */}
          <View style={styles.section}>
            <Text style={styles.label}>Tipo de Contrato</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowContractDropdown(!showContractDropdown)}
            >
              <Text style={styles.dropdownText}>
                {contractTypes.find(type => type.value === contractType)?.label || 'CLT'}
              </Text>
              <Ionicons 
                name={showContractDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#CCCCCC" 
              />
            </TouchableOpacity>
            
            {showContractDropdown && (
              <View style={styles.dropdownOptions}>
                {contractTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setContractType(type.value);
                      setShowContractDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownOptionText,
                      contractType === type.value && styles.selectedOption
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

        </View>
      </ScrollView>

      {/* Botão Publicar */}
      <View style={styles.bottomContainer}>
        <Button
          title="Publicar Vaga"
          onPress={handleCreateJob}
          loading={loading}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};