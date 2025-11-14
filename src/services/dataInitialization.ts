import { JobService } from './jobService';
import { ApplicationService } from './applicationService';
import { CandidateService, CompanyService } from './userServices';

/**
 * Service to initialize app data on first launch
 * This ensures all AsyncStorage is populated with mock data
 */
export class DataInitializationService {
  private static initialized = false;
  private static readonly INIT_KEY = '@app:initialized';

  /**
   * Initialize all app data if needed
   */
  static async initializeAppData(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize all services (they will populate with mock data if empty)
      await Promise.all([
        JobService.getAllJobs(), // This will initialize jobs
        ApplicationService.getAllApplications(), // This will initialize applications
        CandidateService.getAllCandidates(), // This will initialize candidates
        CompanyService.getAllCompanies(), // This will initialize companies
      ]);

      this.initialized = true;
    } catch (error) {
      console.error('❌ Error initializing app data:', error);
      throw error;
    }
  }

  /**
   * Reset all app data to initial state
   */
  static async resetAppData(): Promise<void> {


    try {
      await Promise.all([
        JobService.clearAllJobs(),
        ApplicationService.clearAllApplications(),
        CandidateService.clearAllCandidates(),
        CompanyService.clearAllCompanies(),
      ]);

      this.initialized = false;
      
      // Re-initialize with fresh data
      await this.initializeAppData();
      

    } catch (error) {
      console.error('❌ Error resetting app data:', error);
      throw error;
    }
  }

  /**
   * Get data counts for debugging
   */
  static async getDataCounts(): Promise<{
    jobs: number;
    applications: number;
    candidates: number;
    companies: number;
  }> {
    const [jobs, applications, candidates, companies] = await Promise.all([
      JobService.getAllJobs(),
      ApplicationService.getAllApplications(),
      CandidateService.getAllCandidates(),
      CompanyService.getAllCompanies(),
    ]);

    return {
      jobs: jobs.length,
      applications: applications.length,
      candidates: candidates.length,
      companies: companies.length,
    };
  }

  /**
   * Check if app data is initialized
   */
  static isInitialized(): boolean {
    return this.initialized;
  }
}