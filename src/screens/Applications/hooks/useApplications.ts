import { useState, useEffect, useMemo } from 'react';
import { Application } from '../../../types';

// Mock data para candidaturas
const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    candidateId: 'candidate1',
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
    candidateId: 'candidate1',
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
    candidateId: 'candidate1',
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

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setApplications(mockApplications);
        setLoading(false);
      }, 800);
    };

    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    if (selectedFilter === 'all') {
      return applications;
    }
    
    if (selectedFilter === 'active') {
      return applications.filter(app => 
        app.status === 'pending' || app.status === 'reviewing'
      );
    }
    
    if (selectedFilter === 'finished') {
      return applications.filter(app => 
        app.status === 'approved' || app.status === 'rejected'
      );
    }
    
    return applications;
  }, [applications, selectedFilter]);

  return {
    applications,
    filteredApplications,
    selectedFilter,
    setSelectedFilter,
    loading,
  };
};