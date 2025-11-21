import axios, { AxiosError } from 'axios';
import {
  CompatibilityAnalysis,
  CandidateForAnalysis,
  JobForAnalysis,
  AnalyzeCompatibilityRequest,
  ApiHealthResponse,
  BatchAnalysisResponse,
} from '../types/aiAnalysis';

/**
 * Configuração da API de análise de compatibilidade
 * 
 * IMPORTANTE: A URL da API está configurada via variável de ambiente
 * - Produção (Render): https://ia-8xoy.onrender.com/api
 * - Desenvolvimento local: http://localhost:5000/api
 * - Configure em .env: EXPO_PUBLIC_AI_API_URL
 */
const API_BASE_URL = process.env.EXPO_PUBLIC_AI_API_URL || 'https://ia-8xoy.onrender.com/api';

// Timeout padrão de 30 segundos (análise pode demorar)
const DEFAULT_TIMEOUT = 30000;

/**
 * Service para integração com a API de análise de compatibilidade
 * Powered by Google Gemini AI
 */
export class AIAnalysisService {
  /**
   * Verifica se a API está online e funcionando
   */
  static async checkApiHealth(): Promise<boolean> {
    try {
      const response = await axios.get<ApiHealthResponse>(
        `${API_BASE_URL.replace('/api', '')}/health`,
        { timeout: 5000 }
      );
      return response.data.status === 'online';
    } catch (error) {
      console.error('❌ API Health Check falhou:', error);
      return false;
    }
  }

  /**
   * Analisa a compatibilidade entre candidato e vaga usando IA
   * 
   * @param candidate - Dados do candidato
   * @param job - Dados da vaga
   * @returns Análise completa de compatibilidade ou null em caso de erro
   */
  static async analyzeCompatibility(
    candidate: CandidateForAnalysis,
    job: JobForAnalysis
  ): Promise<CompatibilityAnalysis | null> {
    try {
      console.log('🤖 Iniciando análise de compatibilidade com IA...');
      console.log(`   Candidato: ${candidate.name}`);
      console.log(`   Vaga: ${job.title} - ${job.company}`);

      const request: AnalyzeCompatibilityRequest = {
        candidate,
        job,
      };

      const response = await axios.post<CompatibilityAnalysis>(
        `${API_BASE_URL}/analyze-compatibility`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: DEFAULT_TIMEOUT,
        }
      );

      console.log('✅ Análise concluída com sucesso!');
      console.log(`   Score: ${response.data.compatibility_score}%`);
      console.log(`   Nível: ${response.data.compatibility_level}`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.code === 'ECONNABORTED') {
          console.error('⏱️  Timeout: A análise está demorando muito.');
          console.error('   Dica: Verifique se a API está respondendo.');
        } else if (axiosError.response) {
          console.error('❌ Erro na API:', axiosError.response.status);
          console.error('   Mensagem:', axiosError.response.data);
        } else if (axiosError.request) {
          console.error('❌ Erro de conexão: API não está acessível');
          console.error('   Verifique se a API está rodando em:', API_BASE_URL);
        }
      } else {
        console.error('❌ Erro desconhecido ao analisar compatibilidade:', error);
      }
      
      return null;
    }
  }

  /**
   * Analisa múltiplos candidatos para uma vaga (útil para empresas)
   * 
   * @param job - Dados da vaga
   * @param candidates - Array de candidatos
   * @returns Análises ordenadas por score ou null em caso de erro
   */
  static async batchAnalyze(
    job: JobForAnalysis,
    candidates: CandidateForAnalysis[]
  ): Promise<BatchAnalysisResponse | null> {
    try {
      console.log('🤖 Iniciando análise em lote...');
      console.log(`   Vaga: ${job.title}`);
      console.log(`   Total de candidatos: ${candidates.length}`);

      const response = await axios.post<BatchAnalysisResponse>(
        `${API_BASE_URL}/batch-analyze`,
        {
          job,
          candidates,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: DEFAULT_TIMEOUT * candidates.length, // Timeout proporcional
        }
      );

      console.log('✅ Análise em lote concluída!');
      console.log(`   ${response.data.total_candidates} candidatos analisados`);

      return response.data;
    } catch (error) {
      console.error('❌ Erro ao fazer análise em lote:', error);
      return null;
    }
  }

  /**
   * Converte dados do usuário do app para formato esperado pela API de IA
   * 
   * @param user - Usuário logado no app (candidato)
   * @returns Dados formatados para a API
   */
  static formatCandidateForAnalysis(user: any): CandidateForAnalysis {
    return {
      id: user.id || user.user,
      name: user.name || user.user || 'Candidato',
      title: user.professionalTitle || user.title || 'Profissional',
      experience_years: user.experienceYears || user.experience_years || 0,
      education: user.education || 'Não informado',
      bio: user.bio || user.about || 'Profissional em busca de oportunidades',
      skills: user.skills || [],
      certifications: user.certifications || [],
      languages: user.languages || ['Português (Nativo)'],
      previous_roles: user.previousRoles || user.previous_roles || [],
    };
  }

  /**
   * Converte dados da vaga do app para formato esperado pela API de IA
   * 
   * @param job - Vaga do sistema
   * @returns Dados formatados para a API
   */
  static formatJobForAnalysis(job: any): JobForAnalysis {
    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location || 'Não especificado',
      type: this.formatJobType(job.type),
      category: job.category || 'Geral',
      salary: job.salary || 'A combinar',
      description: job.description,
      requirements: job.requirements || [],
      required_skills: job.required_skills || job.skills || [],
      nice_to_have: job.nice_to_have || job.niceToHave || [],
      responsibilities: job.responsibilities || [],
    };
  }

  /**
   * Formata o tipo de vaga para descrição amigável
   */
  private static formatJobType(type: string): string {
    const typeMap: Record<string, string> = {
      'full-time': 'CLT - Tempo Integral',
      'part-time': 'Meio Período',
      'contract': 'PJ - Contrato',
      'internship': 'Estágio',
    };
    return typeMap[type] || type;
  }

  /**
   * Valida se o candidato e vaga têm dados suficientes para análise
   */
  static validateDataForAnalysis(
    candidate: CandidateForAnalysis,
    job: JobForAnalysis
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validar candidato
    if (!candidate.name || candidate.name.trim() === '') {
      errors.push('Nome do candidato é obrigatório');
    }
    if (!candidate.skills || candidate.skills.length === 0) {
      errors.push('Candidato precisa ter pelo menos uma habilidade cadastrada');
    }

    // Validar vaga
    if (!job.title || job.title.trim() === '') {
      errors.push('Título da vaga é obrigatório');
    }
    if (!job.description || job.description.trim() === '') {
      errors.push('Descrição da vaga é obrigatória');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Retorna mensagem amigável baseada no score de compatibilidade
   */
  static getScoreMessage(score: number): string {
    if (score >= 90) return '🎯 Match excepcional! Você é o candidato ideal!';
    if (score >= 80) return '🟢 Excelente compatibilidade! Forte candidato.';
    if (score >= 70) return '🟡 Boa compatibilidade! Candidato qualificado.';
    if (score >= 60) return '🟠 Compatibilidade moderada. Alguns gaps identificados.';
    if (score >= 50) return '🔴 Compatibilidade baixa. Considere desenvolver mais habilidades.';
    return '⚫ Baixa compatibilidade. Esta vaga pode não ser ideal para você.';
  }

  /**
   * Retorna cor baseada no nível de compatibilidade
   */
  static getScoreColor(score: number): string {
    if (score >= 80) return '#4CAF50'; // Verde
    if (score >= 60) return '#FF9800'; // Laranja
    return '#F44336'; // Vermelho
  }
}
