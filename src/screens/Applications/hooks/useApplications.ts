import { useState, useEffect } from 'react';
import { Application } from '../../../types';
import { ApplicationService } from '../../../services';
import { useAuth } from '../../../contexts/AuthContext';

export const useApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Carregar candidaturas do usuário atual usando ApplicationService
        const userApplications = await ApplicationService.getUserApplications(user.id);
        setApplications(userApplications);
      } catch (error) {
        console.error('Erro ao carregar candidaturas:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user]);

  // Método para atualizar status de uma candidatura
  const updateApplicationStatus = async (applicationId: string, status: 'pending' | 'reviewing' | 'approved' | 'rejected') => {
    try {
      await ApplicationService.updateApplicationStatus(applicationId, status);
      
      // Atualizar estado local
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status }
            : app
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status da candidatura:', error);
      throw error;
    }
  };

  // Método para remover candidatura
  const removeApplication = async (applicationId: string) => {
    try {
      await ApplicationService.deleteApplication(applicationId);
      
      // Atualizar estado local
      setApplications(prev => prev.filter(app => app.id !== applicationId));
    } catch (error) {
      console.error('Erro ao remover candidatura:', error);
      throw error;
    }
  };

  return {
    applications,
    loading,
    updateApplicationStatus,
    removeApplication,
  };
};
