// Serviço principal de autenticação
export { AuthService } from './authService';
export type { User, LoginCredentials, RegisterData } from './authService';

// Serviços de aplicação de vagas
export { ApplicationService } from './applicationService';
export { JobService } from './jobService';

// Serviços de usuários com CRUD completo
export { CandidateService, CompanyService, UserService } from './userServices';

// Serviço base de storage
export { BaseStorageService } from './baseStorage';

// Serviço de inicialização de dados
export { DataInitializationService } from './dataInitialization';