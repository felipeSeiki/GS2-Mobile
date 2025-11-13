import { Application } from '../types/jobs';
import { mockJobs } from './jobs.mock';
import { mockJobCandidates } from './jobUsers.mock';

// Conversão de JobCandidate para Candidate (compatibilidade)
const convertJobCandidateToCandidate = (jobCandidate: any) => {
  if (!jobCandidate) return undefined;
  return {
    id: jobCandidate.id,
    name: jobCandidate.name,
    email: jobCandidate.email,
    phone: jobCandidate.phone,
    location: jobCandidate.location,
    skills: jobCandidate.skills,
    experience: jobCandidate.experience,
    profilePicture: jobCandidate.profilePicture,
  };
};

export const mockApplications: Application[] = [
  // Vaga 1 - Desenvolvedor React Native (TechCorp)
  {
    id: 'app1',
    jobId: '1',
    candidateId: 'candidate1',
    appliedAt: new Date('2024-01-16T10:30:00'),
    status: 'reviewing',
    job: mockJobs[0],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[0]), // Ana Silva
    coverLetter: 'Tenho 3 anos de experiência em React Native e estou muito interessado nesta posição.',
  },
  {
    id: 'app2',
    jobId: '1',
    candidateId: 'candidate2',
    appliedAt: new Date('2024-01-16T14:15:00'),
    status: 'approved',
    job: mockJobs[0],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[1]), // Carlos Santos
    coverLetter: 'Com 5 anos de experiência, acredito que posso contribuir significativamente com o time.',
  },

  // Vaga 2 - Designer UI/UX (DesignStudio)
  {
    id: 'app3',
    jobId: '2',
    candidateId: 'candidate3',
    appliedAt: new Date('2024-01-15T13:30:00'),
    status: 'approved',
    job: mockJobs[1],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[2]), // Mariana Costa
    coverLetter: 'Sou designer UI/UX com 4 anos de experiência e portfolio robusto.',
  },

  // Vaga 3 - Marketing Digital (MarketPro)
  {
    id: 'app4',
    jobId: '3',
    candidateId: 'candidate4',
    appliedAt: new Date('2024-01-14T09:30:00'),
    status: 'approved',
    job: mockJobs[2],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[3]), // Pedro Oliveira
    coverLetter: 'Tenho 2 anos de experiência em marketing digital e sou especialista em Google Ads.',
  },
  {
    id: 'app5',
    jobId: '3',
    candidateId: 'candidate1',
    appliedAt: new Date('2024-01-14T11:00:00'),
    status: 'rejected',
    job: mockJobs[2],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[0]), // Ana Silva
    coverLetter: 'Gostaria de migrar da área de desenvolvimento para marketing digital.',
  },

  // Vaga 4 - Backend Developer (ServerTech)
  {
    id: 'app6',
    jobId: '4',
    candidateId: 'candidate5',
    appliedAt: new Date('2024-01-13T08:00:00'),
    status: 'approved',
    job: mockJobs[3],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[4]), // Juliana Lima
    coverLetter: 'Tenho 6 anos de experiência em desenvolvimento backend, especialista em Node.js.',
  },
  {
    id: 'app7',
    jobId: '4',
    candidateId: 'candidate1',
    appliedAt: new Date('2024-01-13T14:15:00'),
    status: 'reviewing',
    job: mockJobs[3],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[0]), // Ana Silva
    coverLetter: 'Tenho experiência com Node.js e interesse em trabalhar remotamente.',
  },

  // Vaga 5 - Analista de Dados (DataCorp)
  {
    id: 'app8',
    jobId: '5',
    candidateId: 'candidate6',
    appliedAt: new Date('2024-01-12T09:15:00'),
    status: 'approved',
    job: mockJobs[4],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[5]), // Rafael Pereira
    coverLetter: 'Analista de dados com 3 anos de experiência em Python e Machine Learning.',
  },

  // Candidaturas adicionais para candidate1 (Ana Silva) - para testar Applications
  {
    id: 'app9',
    jobId: '2',
    candidateId: 'candidate1',
    appliedAt: new Date('2024-01-15T15:45:00'),
    status: 'reviewing',
    job: mockJobs[1],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[0]),
    coverLetter: 'Mesmo sendo desenvolvedor, tenho interesse e alguns conhecimentos em design.',
  },
  {
    id: 'app10',
    jobId: '5',
    candidateId: 'candidate1',
    appliedAt: new Date('2024-01-13T13:20:00'),
    status: 'rejected',
    job: mockJobs[4],
    candidate: convertJobCandidateToCandidate(mockJobCandidates[0]),
    coverLetter: 'Gostaria de expandir meus conhecimentos para análise de dados.',
  },
];

// Função para filtrar candidaturas por usuário logado
export const getApplicationsForUser = (userId: string): Application[] => {
  return mockApplications.filter(app => app.candidateId === userId);
};

// Função para filtrar candidaturas por empresa
export const getApplicationsForCompany = (companyName: string): Application[] => {
  return mockApplications.filter(app => {
    const job = mockJobs.find(j => j.id === app.jobId);
    return job?.company === companyName;
  });
};