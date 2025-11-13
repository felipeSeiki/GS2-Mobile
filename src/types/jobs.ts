export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  applicationsCount?: number; // Número de candidaturas recebidas
  isActive?: boolean; // Se a vaga ainda está ativa
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience?: string;
  profilePicture?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  appliedAt: Date;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  job: Job;
  candidate?: Candidate; // Informações do candidato (para visualização da empresa)
  coverLetter?: string; // Carta de apresentação
}