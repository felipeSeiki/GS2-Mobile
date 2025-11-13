import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Job } from '../../../types';
import { JobService, ApplicationService } from '../../../services';
import { useAuth } from '../../../contexts/AuthContext';

export const useJobDetails = (jobId: string) => {
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);

  useEffect(() => {
    const loadJobDetails = async () => {
      setLoading(true);
      try {
        const foundJob = await JobService.getJobById(jobId);
        setJob(foundJob);
      } catch (error) {
        console.error('Erro ao carregar detalhes da vaga:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      loadJobDetails();
    }
  }, [jobId]);

  // Verificar se o usuário já se candidatou
  useEffect(() => {
    const checkApplication = async () => {
      if (!user || !jobId || user.userType !== 'candidate') {
        setCheckingApplication(false);
        return;
      }

      setCheckingApplication(true);
      try {
        const applied = await ApplicationService.hasUserApplied(user.id, jobId);
        setHasApplied(applied);
      } catch (error) {
        console.error('Erro ao verificar candidatura:', error);
        setHasApplied(false);
      } finally {
        setCheckingApplication(false);
      }
    };

    checkApplication();
  }, [user, jobId]);

  const handleApply = async () => {
    if (!job || !user || user.userType !== 'candidate') return;

    if (hasApplied) {
      Alert.alert(
        'Já Candidatado',
        'Você já se candidatou a esta vaga. Acompanhe o status na seção "Minhas Candidaturas".',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    try {
      await ApplicationService.applyToJob(job.id, user.id);
      setHasApplied(true);
      
      Alert.alert(
        'Candidatura Enviada!',
        `Sua candidatura para a vaga de ${job.title} na ${job.company} foi enviada com sucesso!`,
        [{ text: 'OK', style: 'default' }]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao enviar sua candidatura. Tente novamente.';
      
      Alert.alert(
        'Erro',
        errorMessage,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return {
    job,
    loading,
    handleApply,
    hasApplied,
    checkingApplication,
    isCandidate: user?.userType === 'candidate',
  };
};