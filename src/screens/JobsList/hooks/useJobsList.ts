import { useState, useEffect, useMemo } from 'react';
import { Job } from '../../../types';
import { JobService, ApplicationService } from '../../../services';
import { useAuth } from '../../../contexts/AuthContext';
import { ALL_CATEGORIES } from '../../../constants/categories';

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

  // Carregar vagas baseado no tipo de usuário
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        let jobsToLoad: Job[] = [];

        if (user?.userType === 'company') {
          // Empresas veem apenas suas próprias vagas
          jobsToLoad = await JobService.getJobsByCompany(user.name);
        } else {
          // Candidatos e visitantes veem todas as vagas disponíveis
          jobsToLoad = await JobService.getAvailableJobsForCandidate(userApplications);
        }

        setJobs(jobsToLoad);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadJobs();
    }
  }, [user, userApplications]);

  // Filtrar vagas baseado na busca e categoria
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Filtrar por categoria
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter((job: Job) => job.category === selectedCategory);
    }

    // Filtrar por busca (não aplicamos filtro de busca aqui porque já foi aplicado no handleSearch)
    if (!searchQuery.trim()) {
      // Se não há busca, aplicamos filtros normais
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((job: Job) => 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        );
      }
    }

    return filtered;
  }, [jobs, selectedCategory, searchQuery]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setLoading(true);
      try {
        let searchResults: Job[] = [];
        
        if (user?.userType === 'company') {
          // Para empresa: buscar apenas nas suas vagas
          const companyJobs = await JobService.getJobsByCompany(user.name);
          const queryLower = query.toLowerCase();
          searchResults = companyJobs.filter(job => 
            job.title.toLowerCase().includes(queryLower) ||
            job.location.toLowerCase().includes(queryLower) ||
            job.category.toLowerCase().includes(queryLower)
          );
        } else {
          // Para candidatos: buscar em todas as vagas disponíveis
          searchResults = await JobService.searchJobs(query);
          // Remover vagas já aplicadas para candidatos
          if (user?.userType === 'candidate') {
            searchResults = searchResults.filter(job => !userApplications.includes(job.id));
          }
        }
        
        setJobs(searchResults);
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Recarregar vagas baseado no perfil quando busca estiver vazia
      setLoading(true);
      try {
        let jobsToLoad: Job[] = [];

        if (user?.userType === 'company') {
          jobsToLoad = await JobService.getJobsByCompany(user.name);
        } else {
          jobsToLoad = await JobService.getAvailableJobsForCandidate(userApplications);
        }

        setJobs(jobsToLoad);
      } catch (error) {
        console.error('Erro ao recarregar vagas:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para recarregar dados
  const refreshData = async () => {
    setLoading(true);
    try {
      // Recarregar candidaturas do usuário primeiro
      if (user && user.userType === 'candidate') {
        const applications = await ApplicationService.getUserApplications(user.id);
        const appliedJobIds = applications.map(app => app.jobId);
        setUserApplications(appliedJobIds);
      }

      // Recarregar vagas
      let jobsToLoad: Job[] = [];
      if (user?.userType === 'company') {
        jobsToLoad = await JobService.getJobsByCompany(user.name);
      } else {
        // Para candidatos, usar as candidaturas atualizadas
        const updatedApplications = user?.userType === 'candidate' 
          ? await ApplicationService.getUserApplications(user.id)
          : [];
        const updatedAppliedJobIds = updatedApplications.map(app => app.jobId);
        jobsToLoad = await JobService.getAvailableJobsForCandidate(updatedAppliedJobIds);
      }

      setJobs(jobsToLoad);
    } catch (error) {
      console.error('Erro ao recarregar dados:', error);
    } finally {
      setLoading(false);
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
    categories: ALL_CATEGORIES,
    userApplications,
    refreshData,
    handleSearch,
  };
};