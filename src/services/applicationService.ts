import { Application } from '../types';
import { Candidate } from '../types/jobs';
import { mockApplications } from '../mocks/applications.mock';
import { mockJobCandidates } from '../mocks/jobUsers.mock';
import { BaseStorageService } from './baseStorage';
import { JobService } from './jobService';
import { deserializeDatesInArray, deserializeDates } from '../utils/dateUtils';

export class ApplicationService {
  private static storage = new BaseStorageService<Application>('@applications');
  private static initialized = false;

  /**
   * Initialize storage with default data if needed
   */
  private static async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.storage.initializeWithDefaults(mockApplications);
      this.initialized = true;
    }
  }

  /**
   * Get applications by user ID
   */
  static async getUserApplications(userId: string): Promise<Application[]> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const applications = await this.storage.findBy(app => app.candidateId === userId);
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(applications, ['appliedAt', 'job.postedAt']);
  }

  /**
   * Get applications for a specific job (for companies)
   */
  static async getJobApplications(jobId: string): Promise<Application[]> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const applications = await this.storage.findBy(app => app.jobId === jobId);
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(applications, ['appliedAt', 'job.postedAt']);
  }

  /**
   * Get application by ID
   */
  static async getApplicationById(applicationId: string): Promise<Application | null> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const application = await this.storage.getById(applicationId);
    if (application) {
      // Deserialize dates that were stored as strings
      return deserializeDates(application, ['appliedAt', 'job.postedAt']);
    }
    return null;
  }

  /**
   * Check if user has already applied to a job
   */
  static async hasUserApplied(userId: string, jobId: string): Promise<boolean> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const application = await this.storage.findOneBy(app => 
      app.candidateId === userId && app.jobId === jobId
    );
    return application !== null;
  }

  /**
   * Apply to a job
   */
  static async applyToJob(jobId: string, candidateId: string, coverLetter?: string): Promise<Application> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 600));

    // Check if already applied
    const hasApplied = await this.hasUserApplied(candidateId, jobId);
    if (hasApplied) {
      throw new Error('Você já se candidatou a esta vaga');
    }

    // Get job information
    const job = await JobService.getJobById(jobId);
    if (!job) {
      throw new Error('Vaga não encontrada');
    }

    // Get candidate information
    const jobCandidate = mockJobCandidates.find(c => c.id === candidateId);
    const candidate: Candidate | undefined = jobCandidate ? {
      id: jobCandidate.id,
      name: jobCandidate.name,
      email: jobCandidate.email,
      phone: jobCandidate.phone,
      location: jobCandidate.location,
      skills: jobCandidate.skills,
      experience: jobCandidate.experience,
      profilePicture: jobCandidate.profilePicture,
    } : undefined;

    const newApplication: Omit<Application, 'id'> = {
      jobId,
      candidateId,
      appliedAt: new Date(),
      status: 'pending',
      job,
      candidate,
      coverLetter,
    };

    const createdApplication = await this.storage.create(newApplication);
    
    // Increment applications count for the job
    await JobService.incrementApplicationsCount(jobId);

    return createdApplication;
  }

  /**
   * Update application status (for companies)
   */
  static async updateApplicationStatus(applicationId: string, status: Application['status']): Promise<Application | null> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 400));

    return await this.storage.update(applicationId, { status });
  }

  /**
   * Delete application
   */
  static async deleteApplication(applicationId: string): Promise<boolean> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 300));

    return await this.storage.delete(applicationId);
  }

  /**
   * Get all applications
   */
  static async getAllApplications(): Promise<Application[]> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 400));

    const applications = await this.storage.getAll();
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(applications, ['appliedAt', 'job.postedAt']);
  }

  /**
   * Get applications by status
   */
  static async getApplicationsByStatus(status: Application['status']): Promise<Application[]> {
    await this.initialize();
    await new Promise(resolve => setTimeout(resolve, 400));

    const applications = await this.storage.findBy(app => app.status === status);
    // Deserialize dates that were stored as strings
    return deserializeDatesInArray(applications, ['appliedAt', 'job.postedAt']);
  }

  /**
   * Get applications count by job
   */
  static async getApplicationsCountByJob(jobId: string): Promise<number> {
    await this.initialize();
    const applications = await this.getJobApplications(jobId);
    return applications.length;
  }

  /**
   * Get applications count by candidate
   */
  static async getApplicationsCountByCandidate(candidateId: string): Promise<number> {
    await this.initialize();
    const applications = await this.getUserApplications(candidateId);
    return applications.length;
  }

  /**
   * Clear all applications (for testing/reset)
   */
  static async clearAllApplications(): Promise<void> {
    await this.storage.clear();
    this.initialized = false;
  }
}