import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';

// Screens
import { OnboardingScreen } from '../screens/Onboarding';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';
import { JobsListScreen } from '../screens/JobsList';
import { JobDetailsScreen } from '../screens/JobDetails';
import { ApplicationsScreen } from '../screens/Applications';
import { CreateJobScreen } from '../screens/CreateJob';
import { EditProfileScreen } from '../screens/EditProfile';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "JobsList" : "Onboarding"}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#1A1A1A',
          },
        }}
      >
        {!isAuthenticated ? (
          // Rotas Públicas - Disponíveis quando não autenticado
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Rotas Privadas - Disponíveis apenas quando autenticado
          <>
            <Stack.Screen name="JobsList" component={JobsListScreen} />
            <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            <Stack.Screen name="Applications" component={ApplicationsScreen} />
            <Stack.Screen name="CreateJob" component={CreateJobScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};