import { JobCandidate, JobCompany, JobUser } from '../types/jobAuth';
import { mockJobCandidates, mockJobCompanies } from '../mocks/jobUsers.mock';
import { BaseStorageService } from './baseStorage';

/**
 * Service for managing candidates (JobCandidate) with full CRUD operations
 */
export class CandidateService {
  private static storage = new BaseStorageService<JobCandidate>('@candidates');
  private static initialized = false;

  /**
   * Initialize storage with default data if needed
   */
  private static async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.storage.initializeWithDefaults(mockJobCandidates);
      this.initialized = true;
    }
  }

  /**
   * Get all candidates
   */
  static async getAllCandidates(): Promise<JobCandidate[]> {
    await this.initialize();
    return await this.storage.getAll();
  }

  /**
   * Get candidate by ID
   */
  static async getCandidateById(id: string): Promise<JobCandidate | null> {
    await this.initialize();
    return await this.storage.getById(id);
  }

  /**
   * Get candidate by email
   */
  static async getCandidateByEmail(email: string): Promise<JobCandidate | null> {
    await this.initialize();
    return await this.storage.findOneBy(candidate => candidate.email === email);
  }

  /**
   * Create new candidate
   */
  static async createCandidate(candidateData: Omit<JobCandidate, 'id' | 'userType' | 'createdAt' | 'updatedAt'>): Promise<JobCandidate> {
    await this.initialize();
    
    const newCandidate: Omit<JobCandidate, 'id'> = {
      ...candidateData,
      userType: 'candidate',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.storage.create(newCandidate);
  }

  /**
   * Update candidate
   */
  static async updateCandidate(id: string, updates: Partial<Omit<JobCandidate, 'id' | 'userType' | 'createdAt'>>): Promise<JobCandidate | null> {
    await this.initialize();
    
    const candidateUpdates = {
      ...updates,
      updatedAt: new Date(),
    };

    return await this.storage.update(id, candidateUpdates);
  }

  /**
   * Delete candidate
   */
  static async deleteCandidate(id: string): Promise<boolean> {
    await this.initialize();
    return await this.storage.delete(id);
  }

  /**
   * Search candidates by skills
   */
  static async searchCandidatesBySkills(skills: string[]): Promise<JobCandidate[]> {
    await this.initialize();
    
    return await this.storage.findBy(candidate => 
      skills.some(skill => 
        candidate.skills.some(candidateSkill => 
          candidateSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  /**
   * Get candidates by location
   */
  static async getCandidatesByLocation(location: string): Promise<JobCandidate[]> {
    await this.initialize();
    
    return await this.storage.findBy(candidate => 
      candidate.location?.toLowerCase().includes(location.toLowerCase()) || false
    );
  }

  /**
   * Clear all candidates (for testing/reset)
   */
  static async clearAllCandidates(): Promise<void> {
    await this.storage.clear();
    this.initialized = false;
  }
}

/**
 * Service for managing companies (JobCompany) with full CRUD operations
 */
export class CompanyService {
  private static storage = new BaseStorageService<JobCompany>('@companies');
  private static initialized = false;

  /**
   * Initialize storage with default data if needed
   */
  private static async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.storage.initializeWithDefaults(mockJobCompanies);
      this.initialized = true;
    }
  }

  /**
   * Get all companies
   */
  static async getAllCompanies(): Promise<JobCompany[]> {
    await this.initialize();
    return await this.storage.getAll();
  }

  /**
   * Get company by ID
   */
  static async getCompanyById(id: string): Promise<JobCompany | null> {
    await this.initialize();
    return await this.storage.getById(id);
  }

  /**
   * Get company by email
   */
  static async getCompanyByEmail(email: string): Promise<JobCompany | null> {
    await this.initialize();
    return await this.storage.findOneBy(company => company.email === email);
  }

  /**
   * Get company by name
   */
  static async getCompanyByName(name: string): Promise<JobCompany | null> {
    await this.initialize();
    return await this.storage.findOneBy(company => company.name === name);
  }

  /**
   * Create new company
   */
  static async createCompany(companyData: Omit<JobCompany, 'id' | 'userType' | 'createdAt' | 'updatedAt'>): Promise<JobCompany> {
    await this.initialize();
    
    const newCompany: Omit<JobCompany, 'id'> = {
      ...companyData,
      userType: 'company',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.storage.create(newCompany);
  }

  /**
   * Update company
   */
  static async updateCompany(id: string, updates: Partial<Omit<JobCompany, 'id' | 'userType' | 'createdAt'>>): Promise<JobCompany | null> {
    await this.initialize();
    
    const companyUpdates = {
      ...updates,
      updatedAt: new Date(),
    };

    return await this.storage.update(id, companyUpdates);
  }

  /**
   * Delete company
   */
  static async deleteCompany(id: string): Promise<boolean> {
    await this.initialize();
    return await this.storage.delete(id);
  }

  /**
   * Search companies by industry
   */
  static async getCompaniesByIndustry(industry: string): Promise<JobCompany[]> {
    await this.initialize();
    
    return await this.storage.findBy(company => 
      company.industry.toLowerCase().includes(industry.toLowerCase())
    );
  }

  /**
   * Get companies by size
   */
  static async getCompaniesBySize(size: JobCompany['size']): Promise<JobCompany[]> {
    await this.initialize();
    
    return await this.storage.findBy(company => company.size === size);
  }

  /**
   * Get companies by location
   */
  static async getCompaniesByLocation(location: string): Promise<JobCompany[]> {
    await this.initialize();
    
    return await this.storage.findBy(company => 
      company.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  /**
   * Clear all companies (for testing/reset)
   */
  static async clearAllCompanies(): Promise<void> {
    await this.storage.clear();
    this.initialized = false;
  }
}

/**
 * Unified User Service for both candidates and companies
 */
export class UserService {
  /**
   * Get all users (candidates + companies)
   */
  static async getAllUsers(): Promise<JobUser[]> {
    const [candidates, companies] = await Promise.all([
      CandidateService.getAllCandidates(),
      CompanyService.getAllCompanies(),
    ]);
    
    return [...candidates, ...companies];
  }

  /**
   * Get user by ID (searches both candidates and companies)
   */
  static async getUserById(id: string): Promise<JobUser | null> {
    const [candidate, company] = await Promise.all([
      CandidateService.getCandidateById(id),
      CompanyService.getCompanyById(id),
    ]);
    
    return candidate || company || null;
  }

  /**
   * Get user by email (searches both candidates and companies)
   */
  static async getUserByEmail(email: string): Promise<JobUser | null> {
    const [candidate, company] = await Promise.all([
      CandidateService.getCandidateByEmail(email),
      CompanyService.getCompanyByEmail(email),
    ]);
    
    return candidate || company || null;
  }

  /**
   * Delete user by ID (works for both candidates and companies)
   */
  static async deleteUser(id: string): Promise<boolean> {
    const [candidateDeleted, companyDeleted] = await Promise.all([
      CandidateService.deleteCandidate(id),
      CompanyService.deleteCompany(id),
    ]);
    
    return candidateDeleted || companyDeleted;
  }

  /**
   * Clear all users (for testing/reset)
   */
  static async clearAllUsers(): Promise<void> {
    await Promise.all([
      CandidateService.clearAllCandidates(),
      CompanyService.clearAllCompanies(),
    ]);
  }
}