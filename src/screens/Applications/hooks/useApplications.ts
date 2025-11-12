import { useState, useEffect, useMemo } from 'react';
import { Application } from '../../../types';
import { ApplicationService } from '../../../services';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      try {
        // Usar um ID de usuário mockado por enquanto
        const userApplications = await ApplicationService.getUserApplications('candidate1');
        setApplications(userApplications);
      } catch (error) {
        console.error('Erro ao carregar candidaturas:', error);
      } finally {
        setLoading(false);
      }
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