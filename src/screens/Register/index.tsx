import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useRegister } from './hook/useRegister';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const {
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
  } = useRegister(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Criar Perfil"
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Crie sua conta para que nossa IA comece a{'\n'}
            encontrar as melhores vagas para você.
          </Text>

          <View style={styles.formContainer}>
            <Input
              label="Nome Completo"
              placeholder="Seu nome completo"
              value={fullName}
              onChangeText={setFullName}
              icon="person-outline"
            />

            <Input
              label="E-mail"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <Input
              label="Senha"
              placeholder="•••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Input
              label="Habilidades Principais"
              placeholder="Descreva brevemente suas principais habilidades e competências: Ex: JavaScript, React, Node.js, Liderança de equipe..."
              value={skills}
              onChangeText={setSkills}
              multiline
              numberOfLines={4}
              style={styles.skillsInput}
            />

            <Button
              title="Criar Conta"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              size="large"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};