import { useState, useEffect, useMemo } from 'react';
import { Job } from '../../../types';
import { JobService } from '../../../services';

const categories = ['Todas', 'Desenvolvimento', 'Design', 'Marketing', 'Dados'];

export const useJobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

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

  // Filtrar vagas baseado na busca e categoria
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

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
  }, [jobs, selectedCategory, searchQuery]);

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
    setSearchQuery: handleSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
  };
};