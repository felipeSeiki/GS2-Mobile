import { Application } from '../types';
import { Candidate } from '../types/jobs';
import { mockApplications } from '../mocks/applications.mock';
import { mockJobs } from '../mocks/jobs.mock';
import { mockCandidates } from '../mocks/candidates.mock';

export class ApplicationService {
  private static applications: Application[] = [...mockApplications];

  // Obter candidaturas de um usuário específico
  static async getUserApplications(userId: string): Promise<Application[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.applications.filter(app => app.candidateId === userId);
  }

  // Obter candidaturas para uma vaga específica (para empresas visualizarem)
  static async getJobApplications(jobId: string): Promise<Application[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.applications.filter(app => app.jobId === jobId);
  }

  // Obter candidatura específica por ID
  static async getApplicationById(applicationId: string): Promise<Application | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.applications.find(app => app.id === applicationId) || null;
  }

  // Verificar se usuário já se candidatou a uma vaga
  static async hasUserApplied(userId: string, jobId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.applications.some(app => 
      app.candidateId === userId && app.jobId === jobId
    );
  }

  // Candidatar-se a uma vaga
  static async applyToJob(jobId: string, candidateId: string, coverLetter?: string): Promise<Application> {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Verificar se já se candidatou
    const hasApplied = await this.hasUserApplied(candidateId, jobId);
    if (hasApplied) {
      throw new Error('Você já se candidatou a esta vaga');
    }

    // Buscar informações da vaga
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error('Vaga não encontrada');
    }

    // Buscar informações do candidato
    const candidate = mockCandidates.find(c => c.id === candidateId);

    const newApplication: Application = {
      id: `app_${Date.now()}`,
      jobId,
      candidateId,
      appliedAt: new Date(),
      status: 'pending',
      job,
      candidate,
      coverLetter,
    };

    this.applications.push(newApplication);
    
    // Incrementar contador de candidaturas da vaga
    if (job.applicationsCount !== undefined) {
      job.applicationsCount++;
    }

    return newApplication;
  }

  // Atualizar status de uma candidatura (para empresas)
  static async updateApplicationStatus(applicationId: string, status: Application['status']): Promise<Application | null> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const application = this.applications.find(app => app.id === applicationId);
    if (application) {
      application.status = status;
    }

    return application || null;
  }
}