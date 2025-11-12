import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';

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
      // Simulação de registro - aqui você integraria com seu service de candidatos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        "Sucesso!", 
        "Conta criada com sucesso! Faça login para continuar.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
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
