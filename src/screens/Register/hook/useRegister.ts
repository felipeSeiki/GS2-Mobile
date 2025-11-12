import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { AuthService } from '../../../services';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export const useRegister = (navigation: RegisterScreenNavigationProp) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !skills) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
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

    setLoading(true);
    
    try {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
      
      const user = await AuthService.register({
        name: fullName,
        email,
        password,
        skills: skillsArray,
        type: 'candidate'
      });
      
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
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    skills,
    setSkills,
    loading,
    handleRegister,
  };
};
