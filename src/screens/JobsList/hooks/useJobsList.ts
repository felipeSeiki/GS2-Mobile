import { useState, useEffect, useMemo } from 'react';
import { Job } from '../../../types';
import { JobService, ApplicationService } from '../../../services';
import { useAuth } from '../../../contexts/AuthContext';

const categories = ['Todas', 'Desenvolvimento', 'Design', 'Marketing', 'Dados'];

export const useJobsList = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [userApplications, setUserApplications] = useState<string[]>([]);

  // Carregar candidaturas do usuário
  useEffect(() => {
    const loadUserApplications = async () => {
      if (!user || user.userType !== 'candidate') {
        setUserApplications([]);
        return;
      }

      try {
        const applications = await ApplicationService.getUserApplications(user.id);
        const appliedJobIds = applications.map(app => app.jobId);
        setUserApplications(appliedJobIds);
      } catch (error) {
        console.error('Erro ao carregar candidaturas do usuário:', error);
        setUserApplications([]);
      }
    };

    loadUserApplications();
  }, [user]);

  // Carregar vagas iniciais
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const allJobs = await JobService.getAllJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Filtrar vagas baseado na busca, categoria e candidaturas
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Para candidatos: remover vagas já aplicadas
    if (user?.userType === 'candidate') {
      filtered = filtered.filter((job: Job) => !userApplications.includes(job.id));
    }

    // Filtrar por categoria
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter((job: Job) => job.category === selectedCategory);
    }

    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((job: Job) => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [jobs, selectedCategory, searchQuery, userApplications, user]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setLoading(true);
      try {
        const searchResults = await JobService.searchJobs(query);
        setJobs(searchResults);
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Recarregar todas as vagas se a busca estiver vazia
      const allJobs = await JobService.getAllJobs();
      setJobs(allJobs);
    }
  };

  return {
    jobs,
    filteredJobs,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    userApplications,
  };
};