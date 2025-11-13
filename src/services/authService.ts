import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  JobUser, 
  JobCandidate, 
  JobCompany, 
  JobLoginCredentials, 
  JobRegisterData,
  UserType 
} from '../types/jobAuth';
import { mockJobCandidates, mockJobCompanies } from '../mocks/jobUsers.mock';

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: '@auth:current_user',
  USERS_DATA: '@auth:users_data',
} as const;

// Interfaces para compatibilidade e novos recursos
export interface LoginCredentials extends JobLoginCredentials {}
export interface RegisterData extends JobRegisterData {}

// Type alias para User (usando JobUser como base)
export type User = JobUser;

// Função utilitária para delay (simular API)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para combinar dados de mock
const getAllMockUsers = (): JobUser[] => {
  return [...mockJobCandidates, ...mockJobCompanies];
};

/**
 * AuthService - Sistema unificado de autenticação
 * Implementa todas as funcionalidades de autenticação seguindo boas práticas
 */
export class AuthService {
  private static currentUser: User | null = null;
  private static users: JobUser[] = getAllMockUsers();

  /**
   * Inicializa o serviço carregando dados do AsyncStorage
   */
  static async initialize(): Promise<void> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.warn('Erro ao carregar dados do usuário:', error);
    }
  }

  /**
   * Realiza login do usuário
   */
  static async login(credentials: LoginCredentials): Promise<User> {
    await delay(800); // Simula delay da API

    const user = this.users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('E-mail não encontrado');
    }

    // Verifica senha - no mock, aceita qualquer senha
    // Em produção, aqui seria feita a validação real
    if (credentials.password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    this.currentUser = user;
    await this.saveUserToStorage(user);
    
    return user;
  }

  /**
   * Registra novo usuário
   */
  static async register(data: RegisterData): Promise<User> {
    await delay(1000); // Simula delay da API

    // Validações
    if (!data.name || !data.email || !data.password) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    if (data.password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Verifica se email já existe
    const existingUser = this.users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado');
    }

    // Cria novo usuário baseado no tipo
    const newUser = this.createUserFromRegisterData(data);
    
    // Adiciona à lista de usuários
    this.users.push(newUser);
    this.currentUser = newUser;
    
    await this.saveUserToStorage(newUser);
    
    return newUser;
  }

  /**
   * Atualiza dados do usuário atual
   */
  static async updateProfile(updates: Partial<JobUser>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('Usuário não está logado');
    }

    await delay(600); // Simula delay da API

    // Atualiza o usuário atual preservando o tipo
    const updatedUser: JobUser = {
      ...this.currentUser,
      ...updates,
      updatedAt: new Date(),
    } as JobUser;
    
    // Atualiza na lista de usuários
    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      this.users[userIndex] = updatedUser;
    }

    this.currentUser = updatedUser;
    await this.saveUserToStorage(updatedUser);

    return updatedUser;
  }

  /**
   * Busca candidatos (para empresas)
   */
  static async searchCandidates(filters?: {
    skills?: string[];
    location?: string;
    experience?: string;
  }): Promise<JobCandidate[]> {
    await delay(500);

    const candidates = this.users.filter(
      (user): user is JobCandidate => user.userType === 'candidate'
    );

    if (!filters) return candidates;

    return candidates.filter(candidate => {
      if (filters.skills && filters.skills.length > 0) {
        const hasSkill = filters.skills.some(skill => 
          candidate.skills.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!hasSkill) return false;
      }

      if (filters.location) {
        if (!candidate.location?.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Busca empresas (para candidatos)
   */
  static async searchCompanies(filters?: {
    industry?: string;
    location?: string;
    size?: string;
  }): Promise<JobCompany[]> {
    await delay(500);

    const companies = this.users.filter(
      (user): user is JobCompany => user.userType === 'company'
    );

    if (!filters) return companies;

    return companies.filter(company => {
      if (filters.industry) {
        if (!company.industry.toLowerCase().includes(filters.industry.toLowerCase())) {
          return false;
        }
      }

      if (filters.location) {
        if (!company.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      if (filters.size) {
        if (company.size !== filters.size) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Realiza logout do usuário
   */
  static async logout(): Promise<void> {
    await delay(300);
    this.currentUser = null;
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  /**
   * Limpa todos os dados do storage (útil para desenvolvimento)
   */
  static async clearStorage(): Promise<void> {
    this.currentUser = null;
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CURRENT_USER,
      STORAGE_KEYS.USERS_DATA,
    ]);
  }

  /**
   * Obtém usuário atual
   */
  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Verifica se usuário está autenticado
   */
  static isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Obtém todos os usuários (para desenvolvimento/debug)
   */
  static getAllUsers(): JobUser[] {
    return this.users;
  }

  // Métodos privados/utilitários

  /**
   * Salva usuário no AsyncStorage
   */
  private static async saveUserToStorage(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (error) {
      console.warn('Erro ao salvar usuário no storage:', error);
    }
  }

  /**
   * Cria usuário a partir dos dados de registro
   */
  private static createUserFromRegisterData(data: RegisterData): JobUser {
    const baseUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (data.userType === 'candidate') {
      return {
        ...baseUser,
        userType: 'candidate',
        skills: data.skills || [],
        phone: data.phone,
        location: data.location,
        experience: data.experience,
      } as JobCandidate;
    } else {
      return {
        ...baseUser,
        userType: 'company',
        description: data.description || '',
        industry: data.industry || '',
        location: data.location || '',
        website: data.website,
        size: data.size || 'startup',
        foundedYear: data.foundedYear,
      } as JobCompany;
    }
  }
}