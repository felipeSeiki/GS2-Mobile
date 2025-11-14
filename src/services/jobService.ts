import { Job } from '../types';
import { mockJobs } from '../mocks/jobs.mock';
import { BaseStorageService } from './baseStorage';
import { deserializeDatesInArray, deserializeDates } from '../utils/dateUtils';

export interface CreateJobData {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  company: string; // Nome da empresa que está criando a vaga
  companyId?: string; // Id da empresa (opcional) para estabelecer propriedade
}

export class JobService {
  private static storage = new BaseStorageService<Job>('@jobs');
  private static initialized = false;

  /**
   * Initialize storage with default data if needed
   */
  private static async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.storage.initializeWithDefaults(mockJobs);
      this.initialized = true;
    }
  }

  /**
   * Get all jobs
   */
  static async getAllJobs(): Promise<Job[]> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const jobs = await this.storage.getAll();
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(jobs, ['postedAt']);
  }

  /**
   * Get job by ID
   */
  static async getJobById(id: string): Promise<Job | null> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const job = await this.storage.getById(id);
    if (job) {
      // Deserialize dates that were stored as strings
      return deserializeDates(job, ['postedAt']);
    }
    return null;
  }

  /**
   * Search jobs by query
   */
  static async searchJobs(query: string): Promise<Job[]> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let jobs: Job[];
    if (!query.trim()) {
      jobs = await this.storage.getAll();
    } else {
      const lowercaseQuery = query.toLowerCase();
      jobs = await this.storage.findBy(job => 
        job.title.toLowerCase().includes(lowercaseQuery) ||
        job.company.toLowerCase().includes(lowercaseQuery) ||
        job.category.toLowerCase().includes(lowercaseQuery) ||
        job.location.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(jobs, ['postedAt']);
  }

  /**
   * Get jobs by category
   */
  static async getJobsByCategory(category: string): Promise<Job[]> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let jobs: Job[];
    if (category === 'Todas') {
      jobs = await this.storage.getAll();
    } else {
      jobs = await this.storage.findBy(job => job.category === category);
    }
    
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(jobs, ['postedAt']);
  }

  /**
   * Create new job
   */
  static async createJob(jobData: CreateJobData): Promise<Job> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newJob: Omit<Job, 'id'> = {
      title: jobData.title,
      company: jobData.company,
      companyId: jobData.companyId,
      location: jobData.location,
      category: jobData.category,
      type: jobData.type,
      salary: jobData.salary,
      description: jobData.description,
      requirements: jobData.requirements,
      postedAt: new Date(),
      applicationsCount: 0,
      isActive: true,
    };

    return await this.storage.create(newJob);
  }

  /**
   * Update existing job
   */
  static async updateJob(id: string, updates: Partial<Omit<Job, 'id'>>): Promise<Job | null> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return await this.storage.update(id, updates);
  }

  /**
   * Delete job
   */
  static async deleteJob(id: string): Promise<boolean> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return await this.storage.delete(id);
  }

  /**
   * Get jobs by company (name or ID)
   */
  static async getJobsByCompany(companyNameOrId: string): Promise<Job[]> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return await this.storage.findBy(job => 
      job.company === companyNameOrId || job.companyId === companyNameOrId
    );
  }

  /**
   * Get available jobs for candidate (excluding applied jobs)
   */
  static async getAvailableJobsForCandidate(excludeJobIds: string[] = []): Promise<Job[]> {
    await this.initialize();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return await this.storage.findBy(job => 
      job.isActive !== false && 
      !excludeJobIds.includes(job.id)
    );
  }

  /**
   * Toggle job active status
   */
  static async toggleJobStatus(id: string): Promise<Job | null> {
    await this.initialize();
    const job = await this.storage.getById(id);
    if (!job) return null;
    
    return await this.storage.update(id, { isActive: !job.isActive });
  }

  /**
   * Increment applications count
   */
  static async incrementApplicationsCount(jobId: string): Promise<void> {
    await this.initialize();
    const job = await this.storage.getById(jobId);
    if (job) {
      await this.storage.update(jobId, { 
        applicationsCount: (job.applicationsCount || 0) + 1 
      });
    }
  }

  /**
   * Get jobs count by company
   */
  static async getJobsCountByCompany(companyNameOrId: string): Promise<number> {
    await this.initialize();
    const jobs = await this.getJobsByCompany(companyNameOrId);
    return jobs.length;
  }

  /**
   * Clear all jobs (for testing/reset)
   */
  static async clearAllJobs(): Promise<void> {
    await this.storage.clear();
    this.initialized = false;
  }
}