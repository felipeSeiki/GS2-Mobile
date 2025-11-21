/**
 * Tipos relacionados à análise de compatibilidade com IA Generativa
 * Integração com Google Gemini API via Backend Python/Flask
 */

/**
 * Análise de compatibilidade entre candidato e vaga gerada pela IA
 */
export interface CompatibilityAnalysis {
  /** Score de compatibilidade de 0 a 100 */
  compatibility_score: number;
  
  /** Nível de compatibilidade: Alto (80-100), Médio (60-79), Baixo (<60) */
  compatibility_level: 'Alto' | 'Médio' | 'Baixo';
  
  /** Resumo executivo da análise */
  summary: string;
  
  /** Habilidades do candidato que são compatíveis com a vaga */
  matching_skills: string[];
  
  /** Habilidades requeridas pela vaga que o candidato não possui */
  missing_skills: string[];
  
  /** Pontos fortes do candidato para esta vaga */
  strengths: string[];
  
  /** Áreas que o candidato precisa desenvolver */
  areas_for_improvement: string[];
  
  /** Recomendações personalizadas (cursos, certificações, etc) */
  recommendations: string[];
  
  /** Análise de experiência profissional */
  experience_match: {
    required_years: number;
    candidate_years: number;
    analysis: string;
  };
  
  /** Análise de expectativa salarial */
  salary_expectation: {
    job_range: string;
    alignment: 'Alinhado' | 'Acima' | 'Abaixo';
    comment: string;
  };
  
  /** Próximos passos sugeridos para o candidato */
  next_steps: string;
  
  /** Metadados da análise */
  metadata?: {
    candidate_id: string;
    candidate_name: string;
    job_id: string;
    job_title: string;
    company: string;
    analyzed_at: string;
    model_used: string;
  };
}

/**
 * Dados do candidato para análise de compatibilidade
 */
export interface CandidateForAnalysis {
  id: string;
  name: string;
  title: string;
  experience_years: number;
  education: string;
  bio: string;
  skills: string[];
  certifications: string[];
  languages: string[];
  previous_roles: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
}

/**
 * Dados da vaga para análise de compatibilidade
 */
export interface JobForAnalysis {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  required_skills: string[];
  nice_to_have: string[];
  responsibilities: string[];
}

/**
 * Request para análise de compatibilidade
 */
export interface AnalyzeCompatibilityRequest {
  candidate: CandidateForAnalysis;
  job: JobForAnalysis;
}

/**
 * Response de análise em lote
 */
export interface BatchAnalysisResponse {
  job_id: string;
  job_title: string;
  total_candidates: number;
  analyzed_at: string;
  results: Array<CompatibilityAnalysis & {
    candidate_id: string;
    candidate_name: string;
  }>;
}

/**
 * Health check da API
 */
export interface ApiHealthResponse {
  status: 'online' | 'offline';
  service: string;
  version: string;
  timestamp: string;
}
