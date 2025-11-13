/**
 * Tipos relacionados à autenticação no sistema de vagas
 */

export type UserType = 'candidate' | 'company';

export interface BaseJobUser {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobCandidate extends BaseJobUser {
  userType: 'candidate';
  phone?: string;
  location?: string;
  skills: string[];
  experience?: string;
  profilePicture?: string;
  resumeUrl?: string;
}

export interface JobCompany extends BaseJobUser {
  userType: 'company';
  description: string;
  industry: string;
  location: string;
  website?: string;
  logo?: string;
  foundedYear?: number;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
}

export type JobUser = JobCandidate | JobCompany;

export interface JobLoginCredentials {
  email: string;
  password: string;
}

export interface JobRegisterData {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  // Campos específicos do candidato
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  // Campos específicos da empresa
  description?: string;
  industry?: string;
  website?: string;
  size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  foundedYear?: number;
}

export interface JobAuthResponse {
  user: JobUser;
  token: string;
}

export interface JobAuthContextData {
  user: JobUser | null;
  loading: boolean;
  signIn: (credentials: JobLoginCredentials) => Promise<void>;
  register: (data: JobRegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  clearStorage: () => Promise<void>;
  isAuthenticated: boolean;
}