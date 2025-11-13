import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';
import { Alert } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Hook personalizado para navegação com proteção de rotas
 * Fornece métodos para navegar de forma segura e mostrar alertas quando necessário
 */
export const useProtectedNavigation = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isAuthenticated, signOut } = useAuth();

  /**
   * Navega para uma rota protegida, verificando autenticação
   * @param routeName Nome da rota
   * @param params Parâmetros da rota (opcional)
   * @param showAlert Se deve mostrar alerta quando não autenticado (padrão: true)
   * @returns true se navegou com sucesso, false se não autenticado
   */
  const navigateToProtected = <T extends keyof RootStackParamList>(
    routeName: T,
    params?: RootStackParamList[T],
    showAlert: boolean = true
  ): boolean => {
    if (!isAuthenticated) {
      if (showAlert) {
        Alert.alert(
          'Acesso Restrito',
          'Você precisa estar logado para acessar esta funcionalidade.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Fazer Login',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
      return false;
    }

    // @ts-ignore - TypeScript não consegue inferir corretamente os tipos aqui
    navigation.navigate(routeName, params);
    return true;
  };

  /**
   * Navega para rota pública (sempre permitida)
   */
  const navigateToPublic = <T extends keyof RootStackParamList>(
    routeName: T,
    params?: RootStackParamList[T]
  ) => {
    // @ts-ignore
    navigation.navigate(routeName, params);
  };

  /**
   * Logout e volta para tela de onboarding
   */
  const logout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer logout. Tente novamente.');
    }
  };

  /**
   * Verifica se uma rota específica requer autenticação
   */
  const isProtectedRoute = (routeName: keyof RootStackParamList): boolean => {
    const publicRoutes: (keyof RootStackParamList)[] = [
      'Onboarding',
      'Login', 
      'Register'
    ];
    
    return !publicRoutes.includes(routeName);
  };

  return {
    navigateToProtected,
    navigateToPublic,
    logout,
    isProtectedRoute,
    isAuthenticated,
    // Métodos padrão do navigation também disponíveis
    goBack: navigation.goBack,
    reset: navigation.reset,
  };
};