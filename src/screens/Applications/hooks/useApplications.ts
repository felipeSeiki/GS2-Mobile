import { useState, useEffect } from 'react';
import { Application } from '../../../types';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData: Application[] = [
          {
            id: '1',
            jobId: '1',
            candidateId: 'candidate1',
            appliedAt: new Date('2024-01-16'),
            status: 'approved',
            job: {
              id: '1',
              title: 'Designer de Produto Sênior',
              company: 'TechCorp',
              location: 'São Paulo, SP',
              category: 'Design',
              type: 'full-time',
              description: 'Designer experiente.',
              requirements: [],
              benefits: [],
              postedAt: new Date('2024-01-15'),
            },
          },
          {
            id: '2',
            jobId: '2',
            candidateId: 'candidate1',
            appliedAt: new Date('2024-01-15'),
            status: 'reviewing',
            job: {
              id: '2',
              title: 'Engenheiro(a) de Software',
              company: 'DevStudio',
              location: 'Rio de Janeiro, RJ',
              category: 'Desenvolvimento',
              type: 'full-time',
              description: 'Desenvolvedor experiente.',
              requirements: [],
              benefits: [],
              postedAt: new Date('2024-01-14'),
            },
          },
          {
            id: '3',
            jobId: '3',
            candidateId: 'candidate1',
            appliedAt: new Date('2024-01-14'),
            status: 'pending',
            job: {
              id: '3',
              title: 'Analista de Marketing Digital',
              company: 'MarketPro',
              location: 'Belo Horizonte, MG',
              category: 'Marketing',
              type: 'full-time',
              description: 'Profissional para campanhas digitais.',
              requirements: [],
              benefits: [],
              postedAt: new Date('2024-01-13'),
            },
          },
          {
            id: '4',
            jobId: '4',
            candidateId: 'candidate1',
            appliedAt: new Date('2024-01-13'),
            status: 'rejected',
            job: {
              id: '4',
              title: 'Gerente de Projetos',
              company: 'ProjectCorp',
              location: 'São Paulo, SP',
              category: 'Gestão',
              type: 'full-time',
              description: 'Gerente de projetos experiente.',
              requirements: [],
              benefits: [],
              postedAt: new Date('2024-01-12'),
            },
          },
        ];
        
        setApplications(mockData);
      } catch (error) {
        console.error('Erro ao carregar candidaturas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return {
    applications,
    loading,
  };
};
