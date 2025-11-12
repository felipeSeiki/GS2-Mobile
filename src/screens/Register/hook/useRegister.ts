import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { AuthService } from '../../../services';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
type UserType = 'candidate' | 'company';

export const useRegister = (navigation: RegisterScreenNavigationProp) => {
  const [userType, setUserType] = useState<UserType>('candidate');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validações comuns
    if (!email || !password) {
      Alert.alert("Erro", "Email e senha são obrigatórios");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!email.includes('@')) {
      Alert.alert("Erro", "Por favor, insira um email válido");
      return;
    }

    // Validações específicas por tipo
    if (userType === 'candidate') {
      if (!fullName || !skills) {
        Alert.alert("Erro", "Nome completo e habilidades são obrigatórios para candidatos");
        return;
      }
    } else {
      if (!companyName || !companyDescription) {
        Alert.alert("Erro", "Nome da empresa e descrição são obrigatórios");
        return;
      }
    }

    setLoading(true);
    
    try {
      let userData: any = {
        email,
        password,
        type: userType
      };

      if (userType === 'candidate') {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
        userData = {
          ...userData,
          name: fullName,
          skills: skillsArray
        };
      } else {
        userData = {
          ...userData,
          name: companyName,
          companyDescription
        };
      }
      
      const user = await AuthService.register(userData);
      
      Alert.alert(
        "Sucesso!", 
        `Conta criada com sucesso! Bem-vindo(a), ${user.name}!`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('JobsList')
          }
        ]
      );
    } catch (error) {
      Alert.alert("Erro", error instanceof Error ? error.message : "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    userType,
    setUserType,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    skills,
    setSkills,
    companyName,
    setCompanyName,
    companyDescription,
    setCompanyDescription,
    loading,
    handleRegister,
  };
};
