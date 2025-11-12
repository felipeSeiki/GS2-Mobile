import { useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { AuthService } from '../../../services';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const useLogin = (navigation: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    
    try {
      const user = await AuthService.login({ email, password });
      
      Alert.alert(
        "Login realizado!",
        `Bem-vindo(a), ${user.name}!`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('JobsList')
          }
        ]
      );
    } catch (error) {
      Alert.alert("Erro", error instanceof Error ? error.message : "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
};
