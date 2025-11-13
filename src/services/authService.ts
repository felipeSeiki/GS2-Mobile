import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  JobUser, 
  JobCandidate, 
  JobCompany, 
  JobLoginCredentials, 
  JobRegisterData,
  UserType 
} from '../types/jobAuth';
import { UserService, CandidateService, CompanyService } from './userServices';

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: '@auth:current_user',
} as const;

// Interfaces para compatibilidade e novos recursos
export interface LoginCredentials extends JobLoginCredentials {}
export interface RegisterData extends JobRegisterData {}

// Type alias para User (usando JobUser como base)
export type User = JobUser;

// Função utilitária para delay (simular API)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * AuthService - Sistema unificado de autenticação
 * Implementa todas as funcionalidades de autenticação seguindo boas práticas
 * Agora usando AsyncStorage através dos serviços de usuário
 */
export class AuthService {
  private static currentUser: User | null = null;

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

    const user = await UserService.getUserByEmail(credentials.email);
    
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
    const existingUser = await UserService.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado');
    }

    // Cria novo usuário baseado no tipo usando os serviços apropriados
    let newUser: JobUser;
    if (data.userType === 'candidate') {
      newUser = await CandidateService.createCandidate({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        location: data.location,
        skills: data.skills || [],
        experience: data.experience,
      });
    } else {
      newUser = await CompanyService.createCompany({
        name: data.name,
        email: data.email,
        password: data.password,
        description: data.description || '',
        industry: data.industry || '',
        location: data.location || '',
        website: data.website,
        size: data.size || 'small',
        foundedYear: data.foundedYear,
      });
    }
    
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

    let updatedUser: JobUser | null = null;

    // Atualiza usando o serviço apropriado baseado no tipo do usuário
    if (this.currentUser.userType === 'candidate') {
      updatedUser = await CandidateService.updateCandidate(this.currentUser.id, updates);
    } else if (this.currentUser.userType === 'company') {
      updatedUser = await CompanyService.updateCompany(this.currentUser.id, updates);
    }

    if (!updatedUser) {
      throw new Error('Erro ao atualizar perfil');
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

    let candidates = await CandidateService.getAllCandidates();

    if (!filters) return candidates;

    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      candidates = await CandidateService.searchCandidatesBySkills(filters.skills);
    }

    // Apply location filter
    if (filters.location) {
      candidates = candidates.filter(candidate => 
        candidate.location && 
        candidate.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Apply experience filter
    if (filters.experience) {
      candidates = candidates.filter(candidate => 
        candidate.experience &&
        candidate.experience.toLowerCase().includes(filters.experience!.toLowerCase())
      );
    }

    return candidates;
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

    let companies = await CompanyService.getAllCompanies();

    if (!filters) return companies;

    // Apply industry filter
    if (filters.industry) {
      companies = await CompanyService.getCompaniesByIndustry(filters.industry);
    }

    // Apply location filter
    if (filters.location) {
      if (companies.length === await CompanyService.getAllCompanies().then(c => c.length)) {
        // If we haven't filtered by industry, filter by location from all companies
        companies = await CompanyService.getCompaniesByLocation(filters.location);
      } else {
        // Filter the already filtered results
        companies = companies.filter(company => 
          company.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
    }

    // Apply size filter
    if (filters.size) {
      companies = companies.filter(company => 
        company.size === filters.size as JobCompany['size']
      );
    }

    return companies;
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
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    await UserService.clearAllUsers();
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
  static async getAllUsers(): Promise<JobUser[]> {
    return await UserService.getAllUsers();
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


}