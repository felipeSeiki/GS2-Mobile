import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DangerButton } from '../../components/DangerButton';
import { BottomTabBar } from '../../components/BottomTabBar';
import { Header } from '../../components/Header';
import { useEditProfile } from './hooks/useEditProfile';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './styles';

type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const { clearStorage } = useAuth();
  const {
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
  } = useEditProfile(navigation);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="Editar Perfil"
          showBackButton 
          onBackPress={() => navigation.goBack()} 
        />
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getUserTypeLabel = (type: string) => {
    return type === 'candidate' ? 'Candidato' : 'Empresa';
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Editar Perfil"
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Seção do Perfil */}
          <View style={styles.profileSection}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>{getInitial(user.name)}</Text>
            </View>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileType}>{getUserTypeLabel(user.userType)}</Text>
          </View>

          {/* Informações Básicas */}
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          <View style={styles.formContainer}>
            <Input
              label={user.userType === 'candidate' ? "Nome Completo" : "Nome da Empresa"}
              placeholder={user.userType === 'candidate' ? "Seu nome completo" : "Nome da sua empresa"}
              value={name}
              onChangeText={setName}
              icon={user.userType === 'candidate' ? "person-outline" : "business-outline"}
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

            {user.userType === 'candidate' ? (
              <Input
                label="Habilidades Principais"
                placeholder="Descreva brevemente suas principais habilidades e competências: Ex: JavaScript, React, Node.js, Liderança de equipe..."
                value={skills}
                onChangeText={setSkills}
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
            ) : (
              <Input
                label="Descrição da Empresa"
                placeholder="Descreva sua empresa, setor de atuação, valores e o que vocês fazem..."
                value={companyDescription}
                onChangeText={setCompanyDescription}
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
            )}
          </View>

          {/* Seção de Senha */}
          <Text style={styles.sectionTitle}>Alterar Senha</Text>
          <Text style={styles.passwordNote}>
            Deixe os campos em branco se não quiser alterar a senha atual.
          </Text>
          <View style={styles.formContainer}>
            <Input
              label="Senha Atual"
              placeholder="•••••••••"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Input
              label="Nova Senha"
              placeholder="•••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Input
              label="Confirmar Nova Senha"
              placeholder="•••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />
          </View>

          {/* Ações */}
          <View style={styles.actionsSection}>
            <Button
              title="Salvar Alterações"
              onPress={handleSaveProfile}
              loading={loading}
              fullWidth
              size="large"
              style={styles.saveButton}
            />

            <Button
              title="Sair da Conta"
              onPress={handleLogout}
              fullWidth
              size="large"
              variant="outline"
            />

            <DangerButton
              title="Excluir Conta"
              onPress={handleDeleteAccount}
              fullWidth
            />

            {/* Botões temporários para desenvolvimento */}
            {__DEV__ && (
              <View style={{ gap: 8, marginTop: 12 }}>
                <TouchableOpacity 
                  style={{
                    backgroundColor: '#FF9800',
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  onPress={async () => {
                    try {
                      const { DevTools } = require('../../utils/devTools');
                      await DevTools.clearAppData();
                      await clearStorage();
                      Alert.alert(
                        'Dados Limpos!', 
                        'AsyncStorage limpo. Feche e abra o app novamente para ver os mocks originais.',
                        [{ text: 'OK' }]
                      );
                    } catch (error) {
                      Alert.alert('Erro', 'Erro ao limpar dados: ' + error);
                    }
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                    🧹 Resetar AsyncStorage (Dev)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{
                    backgroundColor: '#2196F3',
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  onPress={async () => {
                    const { DevTools } = require('../../utils/devTools');
                    await DevTools.debugAsyncStorage();
                    Alert.alert('Debug', 'Confira o console para ver os dados do AsyncStorage');
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                    🔍 Debug AsyncStorage (Dev)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar navigation={navigation} activeTab="profile" />
    </SafeAreaView>
  );
};