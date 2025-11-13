import { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { JobService } from '../../../services';
import { useAuth } from '../../../contexts/AuthContext';

type CreateJobScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateJob'>;

export const useCreateJob = (navigation: CreateJobScreenNavigationProp) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [contractType, setContractType] = useState('full-time');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContractDropdown, setShowContractDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, informe o título da vaga');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, informe a descrição da vaga');
      return false;
    }

    if (!requirements.trim()) {
      Alert.alert('Erro', 'Por favor, informe os requisitos da vaga');
      return false;
    }

    if (!location.trim()) {
      Alert.alert('Erro', 'Por favor, informe a localização da vaga');
      return false;
    }

    if (!category.trim()) {
      Alert.alert('Erro', 'Por favor, informe a categoria da vaga');
      return false;
    }

    return true;
  };

  const handleCreateJob = async () => {
    if (!validateForm()) {
      return;
    }

    if (!user || user.userType !== 'company') {
      Alert.alert('Erro', 'Apenas empresas podem criar vagas');
      return;
    }

    setLoading(true);

    try {
      // Convertendo requirements de string para array
      const requirementsArray = requirements
        .split('\n')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      const jobData = {
        title: title.trim(),
        description: description.trim(),
        requirements: requirementsArray,
        location: location.trim(),
        category: category.trim(),
        type: contractType as 'full-time' | 'part-time' | 'contract' | 'internship',
        salary: salary.trim() || undefined,
        company: user.name, // Nome da empresa logada
        companyId: user.id,
      };

      // Criação real da vaga usando o JobService
      await JobService.createJob(jobData);

      Alert.alert(
        'Sucesso!',
        'Vaga publicada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpar formulário
              setTitle('');
              setDescription('');
              setRequirements('');
              setLocation('');
              setContractType('full-time');
              setSalary('');
              setCategory('');
              
              // Navegar de volta
              navigation.goBack();
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível publicar a vaga. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
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
    showCategoryDropdown,
    setShowCategoryDropdown,
    loading,
    handleCreateJob,
    showContractDropdown,
    setShowContractDropdown,
  };
};