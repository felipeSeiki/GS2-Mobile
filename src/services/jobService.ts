import { Job } from '../types';
import { mockJobs } from '../mocks/jobs.mock';

export class JobService {
  private static jobs: Job[] = [...mockJobs];

  static async getAllJobs(): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.jobs];
  }

  static async getJobById(id: string): Promise<Job | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.jobs.find(job => job.id === id) || null;
  }

  static async searchJobs(query: string): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!query.trim()) {
      return [...this.jobs];
    }

    const lowercaseQuery = query.toLowerCase();
    return this.jobs.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.category.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery)
    );
  }

  static async getJobsByCategory(category: string): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (category === 'Todas') {
      return [...this.jobs];
    }

    return this.jobs.filter(job => job.category === category);
  }
}