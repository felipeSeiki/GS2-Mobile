import { Application } from '../types';

export class ApplicationService {
  private static applications: Application[] = [];

  static async getUserApplications(userId: string): Promise<Application[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock applications for demo
    const mockApplications: Application[] = [
      {
        id: '1',
        jobId: '1',
        candidateId: userId,
        appliedAt: new Date('2024-01-16'),
        status: 'reviewing',
        job: {
          id: '1',
          title: 'Desenvolvedor React Native',
          company: 'TechCorp',
          location: 'São Paulo, SP',
          category: 'Desenvolvimento',
          type: 'full-time',
          salary: 'R$ 8.000 - R$ 12.000',
          description: 'Desenvolvedor React Native experiente.',
          requirements: [],
          benefits: [],
          postedAt: new Date('2024-01-15'),
        },
      },
      {
        id: '2',
        jobId: '2',
        candidateId: userId,
        appliedAt: new Date('2024-01-15'),
        status: 'approved',
        job: {
          id: '2',
          title: 'Designer UI/UX',
          company: 'DesignStudio',
          location: 'Rio de Janeiro, RJ',
          category: 'Design',
          type: 'full-time',
          salary: 'R$ 6.000 - R$ 9.000',
          description: 'Designer criativo para experiências digitais.',
          requirements: [],
          benefits: [],
          postedAt: new Date('2024-01-14'),
        },
      },
      {
        id: '3',
        jobId: '3',
        candidateId: userId,
        appliedAt: new Date('2024-01-14'),
        status: 'rejected',
        job: {
          id: '3',
          title: 'Analista de Marketing Digital',
          company: 'MarketPro',
          location: 'Belo Horizonte, MG',
          category: 'Marketing',
          type: 'full-time',
          salary: 'R$ 4.500 - R$ 7.000',
          description: 'Profissional para campanhas digitais.',
          requirements: [],
          benefits: [],
          postedAt: new Date('2024-01-13'),
        },
      },
    ];

    return mockApplications;
  }

  static async applyToJob(jobId: string, candidateId: string): Promise<Application> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const newApplication: Application = {
      id: Date.now().toString(),
      jobId,
      candidateId,
      appliedAt: new Date(),
      status: 'pending',
      job: {
        id: jobId,
        title: 'Vaga Aplicada',
        company: 'Empresa',
        location: 'Localização',
        category: 'Categoria',
        type: 'full-time',
        description: 'Descrição da vaga',
        requirements: [],
        benefits: [],
        postedAt: new Date(),
      },
    };

    this.applications.push(newApplication);
    return newApplication;
  }

  static async getApplicationById(applicationId: string): Promise<Application | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.applications.find(app => app.id === applicationId) || null;
  }
}