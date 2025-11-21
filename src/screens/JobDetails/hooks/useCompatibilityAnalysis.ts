import { useState, useEffect } from 'react';
import { CompatibilityAnalysis } from '../../../types/aiAnalysis';
import { AIAnalysisService } from '../../../services/aiAnalysisService';
import { Job } from '../../../types/jobs';

/**
 * Hook para gerenciar análise de compatibilidade AI
 */
export const useCompatibilityAnalysis = (job: Job | null, user: any) => {
  const [analysis, setAnalysis] = useState<CompatibilityAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  // Verificar se API está disponível
  useEffect(() => {
    checkApiAvailability();
  }, []);

  const checkApiAvailability = async () => {
    const available = await AIAnalysisService.checkApiHealth();
    setApiAvailable(available);
    
    if (!available) {
      setError('API de análise não está disponível no momento');
    }
  };

  // Executar análise quando job e user estiverem disponíveis
  useEffect(() => {
    if (job && user && apiAvailable) {
      performAnalysis();
    }
  }, [job, user, apiAvailable]);

  const performAnalysis = async () => {
    if (!job || !user) return;

    setLoading(true);
    setError(null);

    try {
      // Formatar dados para a API
      const candidate = AIAnalysisService.formatCandidateForAnalysis(user);
      const jobFormatted = AIAnalysisService.formatJobForAnalysis(job);

      // Validar dados
      const validation = AIAnalysisService.validateDataForAnalysis(candidate, jobFormatted);
      
      if (!validation.valid) {
        setError(validation.errors.join('. '));
        setLoading(false);
        return;
      }

      // Executar análise
      const result = await AIAnalysisService.analyzeCompatibility(candidate, jobFormatted);

      if (result) {
        setAnalysis(result);
        setError(null);
      } else {
        setError('Não foi possível gerar a análise. Tente novamente mais tarde.');
      }
    } catch (err) {
      console.error('Erro ao analisar compatibilidade:', err);
      setError('Erro ao analisar compatibilidade. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const retryAnalysis = () => {
    setError(null);
    setAnalysis(null);
    performAnalysis();
  };

  return {
    analysis,
    loading,
    error,
    apiAvailable,
    retryAnalysis,
  };
};
