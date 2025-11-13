import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../services/authService';
import { ApplicationService } from '../services/applicationService';

export class DevTools {
  
  /**
   * Limpa completamente o AsyncStorage (apenas em desenvolvimento)
   */
  static async clearAsyncStorage(): Promise<void> {
    if (!__DEV__) {
      console.warn('❌ clearAsyncStorage só pode ser usado em desenvolvimento');
      return;
    }

    try {
      console.log('🧹 Iniciando limpeza do AsyncStorage...');
      
      // Obter todas as chaves do AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      console.log('📋 Chaves encontradas:', keys);
      
      if (keys.length > 0) {
        // Remover todas as chaves
        await AsyncStorage.multiRemove(keys);
        console.log('✅ Todas as chaves removidas:', keys);
      } else {
        console.log('ℹ️ Nenhuma chave encontrada no AsyncStorage');
      }
      
      console.log('🎉 AsyncStorage completamente limpo!');
      console.log('🔄 Reinicie o app para carregar os dados originais dos mocks');
      
    } catch (error) {
      console.error('❌ Erro ao limpar AsyncStorage:', error);
      throw error;
    }
  }

  /**
   * Exibe todas as chaves e valores do AsyncStorage
   */
  static async debugAsyncStorage(): Promise<void> {
    if (!__DEV__) {
      console.warn('❌ debugAsyncStorage só pode ser usado em desenvolvimento');
      return;
    }

    try {
      console.log('🔍 Debugando AsyncStorage...');
      
      const keys = await AsyncStorage.getAllKeys();
      console.log('📋 Total de chaves:', keys.length);
      
      if (keys.length === 0) {
        console.log('📭 AsyncStorage está vazio');
        return;
      }

      const items = await AsyncStorage.multiGet(keys);
      
      console.log('📊 Conteúdo do AsyncStorage:');
      items.forEach(([key, value]) => {
        console.log(`🔑 ${key}:`, value ? JSON.parse(value) : null);
      });
      
    } catch (error) {
      console.error('❌ Erro ao debugar AsyncStorage:', error);
    }
  }

  /**
   * Remove apenas as chaves específicas do app
   */
  static async clearAppData(): Promise<void> {
    if (!__DEV__) {
      console.warn('❌ clearAppData só pode ser usado em desenvolvimento');
      return;
    }

    try {
      console.log('🧹 Limpando dados específicos do app...');
      
      const appKeys = [
        '@JobApp:user',
        '@JobApp:token', 
        '@JobApp:lastAuthResponse',
      ];
      
      await AsyncStorage.multiRemove(appKeys);
      console.log('✅ Dados do app removidos:', appKeys);
      
    } catch (error) {
      console.error('❌ Erro ao limpar dados do app:', error);
      throw error;
    }
  }

  /**
   * Faz login automático com credenciais de teste
   */
  static async autoLogin(userType: 'candidate' | 'company' = 'candidate'): Promise<void> {
    if (!__DEV__) return;

    try {
      const credentials = userType === 'candidate' 
        ? { email: 'ana.silva@email.com', password: '123456' }
        : { email: 'contato@techcorp.com', password: '123456' };

      await AuthService.login(credentials);
      console.log(`✅ Login automático realizado como ${userType}!`);
    } catch (error) {
      console.error('❌ Erro no login automático:', error);
    }
  }

  /**
   * Testa funcionalidades de candidatura
   */
  static async testApplications(): Promise<void> {
    if (!__DEV__) return;

    try {
      const user = AuthService.getCurrentUser();
      if (!user || user.userType !== 'candidate') {
        console.log('⚠️ Usuário não é candidato ou não está logado');
        return;
      }

      console.log('🧪 === TESTE DE CANDIDATURAS ===');
      console.log('👤 Usuário:', user.name, `(${user.id})`);

      // Testa várias vagas
      for (let i = 1; i <= 5; i++) {
        const hasApplied = await ApplicationService.hasUserApplied(user.id, i.toString());
        console.log(`🔍 Vaga ${i}: ${hasApplied ? '✅ JÁ SE CANDIDATOU' : '❌ AINDA NÃO'}`);
      }

      // Lista todas as candidaturas do usuário
      const applications = await ApplicationService.getUserApplications(user.id);
      console.log(`📋 Total de candidaturas: ${applications.length}`);
      
      console.log('🧪 === FIM DO TESTE ===');
      
    } catch (error) {
      console.error('❌ Erro no teste:', error);
    }
  }

  /**
   * Mostra informações do usuário atual
   */
  static showUserInfo(): void {
    if (!__DEV__) return;

    const user = AuthService.getCurrentUser();
    if (user) {
      console.log('👤 Usuário logado:', {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.userType
      });
    } else {
      console.log('❌ Nenhum usuário logado');
    }
  }

  /**
   * Mostra informações de debug no console
   */
  static logDebugInfo(): void {
    if (!__DEV__) return;

    console.log('🔧 === DEBUG INFO ===');
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('⚛️ React Native Dev Mode:', __DEV__);
    console.log('📱 Platform:', require('react-native').Platform.OS);
    console.log('🔧 === FIM DEBUG INFO ===');
  }
}

// Tornar disponível globalmente em desenvolvimento
if (__DEV__) {
  (global as any).DevTools = DevTools;
  
  // Logs de inicialização
  console.log('🔨 DevTools carregado!');
  console.log('💡 Use DevTools.clearAsyncStorage() para limpar o storage');
  console.log('💡 Use DevTools.debugAsyncStorage() para ver o conteúdo');
  console.log('💡 Use DevTools.autoLogin("candidate") para login automático');
  console.log('💡 Use DevTools.testApplications() para testar candidaturas');
  console.log('💡 Use DevTools.showUserInfo() para ver usuário atual');
}