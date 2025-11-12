import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Job } from '../../../types';
import { JobService, ApplicationService } from '../../../services';

export const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleApply = async () => {
    if (!job) return;

    try {
      // Usar um ID de candidato mockado por enquanto
      await ApplicationService.applyToJob(job.id, 'candidate1');
      
      Alert.alert(
        'Candidatura Enviada!',
        `Sua candidatura para a vaga de ${job.title} na ${job.company} foi enviada com sucesso!`,
        [
          {
            text: 'OK',
            style: 'default',
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao enviar sua candidatura. Tente novamente.',
        [
          {
            text: 'OK',
            style: 'default',
          }
        ]
      );
    }
  };

  return {
    job,
    loading,
    handleApply,
  };
};