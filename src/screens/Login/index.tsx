import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useLogin } from './hooks/useLogin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  } = useLogin(navigation);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="share-social" size={60} color="#4A9EFF" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Acesse sua conta</Text>
        <Text style={styles.subtitle}>
          Bem-vindo de volta! Faça login ou crie uma nova conta.
        </Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            size="large"
          />

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            variant="outline"
            fullWidth
            size="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  formContainer: {
    gap: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: '#4A9EFF',
    fontSize: 14,
  },
});