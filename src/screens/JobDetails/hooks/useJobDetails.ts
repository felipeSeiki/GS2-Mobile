import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Job } from '../../../types';
import { mockJobs } from '../../../mocks/jobs.mock';

export const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobDetails = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const foundJob = mockJobs.find((j: Job) => j.id === jobId);
        setJob(foundJob || null);
        setLoading(false);
      }, 800);
    };

    if (jobId) {
      loadJobDetails();
    }
  }, [jobId]);

  const handleApply = () => {
    if (!job) return;

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
  };

  return {
    job,
    loading,
    handleApply,
  };
};