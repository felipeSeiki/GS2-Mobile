import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon/Logo Section */}
        <View style={styles.iconContainer}>
          <Ionicons name="briefcase" size={80} color="#4A9EFF" />
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Bem-vindo(a) ao{'\n'}
            Futuro do{'\n'}
            Recrutamento
          </Text>
          <Text style={styles.subtitle}>
            Conectando talentos e oportunidades com{'\n'}
            inteligência.
          </Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonSection}>
          <Button
            title="Começar"
            onPress={handleGetStarted}
            fullWidth
            size="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};