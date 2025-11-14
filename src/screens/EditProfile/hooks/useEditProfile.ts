import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { AuthService, User } from '../../../services';
import { useAuth } from '../../../contexts/AuthContext';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

export const useEditProfile = (navigation: EditProfileScreenNavigationProp) => {
  const { user, updateProfile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);


  
  // Estados comuns
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Estados específicos para candidatos
  const [skills, setSkills] = useState("");
  
  // Estados específicos para empresas
  const [companyDescription, setCompanyDescription] = useState("");

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      
      if (user.userType === 'candidate' && 'skills' in user && user.skills) {
        setSkills(user.skills.join(', '));
      }

      if (user.userType === 'company' && 'description' in user) {
        setCompanyDescription(user.description);
      }
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado");
      return;
    }

    if (!name || !email) {
      Alert.alert("Erro", "Nome e email são obrigatórios");
      return;
    }

    // Validações específicas por tipo
    if (user.userType === 'candidate' && !skills.trim()) {
      Alert.alert("Erro", "Habilidades são obrigatórias para candidatos");
      return;
    }

    if (user.userType === 'company' && !companyDescription.trim()) {
      Alert.alert("Erro", "Descrição da empresa é obrigatória");
      return;
    }

    // Validação de senha se informada
    if (newPassword) {
      if (!currentPassword) {
        Alert.alert("Erro", "Informe a senha atual para alterar a senha");
        return;
      }
      
      if (newPassword.length < 6) {
        Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres");
        return;
      }
      
      if (newPassword !== confirmPassword) {
        Alert.alert("Erro", "A confirmação da senha não confere");
        return;
      }

      // Validar senha atual (simulação)
      if (currentPassword !== user.password) {
        Alert.alert("Erro", "Senha atual incorreta");
        return;
      }
    }

    if (!email.includes('@')) {
      Alert.alert("Erro", "Por favor, insira um email válido");
      return;
    }

    setLoading(true);
    
    try {
      // Preparar dados para atualização
      const updates: any = {
        name: name.trim(),
        email: email.trim(),
      };

      // Adicionar senha se foi alterada
      if (newPassword) {
        updates.password = newPassword;
      }

      // Adicionar campos específicos por tipo de usuário
      if (user.userType === 'candidate') {
        updates.skills = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      } else if (user.userType === 'company') {
        updates.description = companyDescription.trim();
      }

      // Atualizar perfil usando AuthContext
      await updateProfile(updates);
      
      // Limpar campos de senha
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      Alert.alert(
        "Sucesso!", 
        "Perfil atualizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível atualizar o perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a conta.");
            }
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível fazer logout.");
            }
          }
        }
      ]
    );
  };

  return {
    user,
    name,
    setName,
    email,
    setEmail,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    skills,
    setSkills,
    companyDescription,
    setCompanyDescription,
    loading,
    handleSaveProfile,
    handleDeleteAccount,
    handleLogout,
  };
};