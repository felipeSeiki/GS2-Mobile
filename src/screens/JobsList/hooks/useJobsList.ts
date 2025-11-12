import { useState, useEffect, useMemo } from 'react';

// Mock data para simular vagas
const mockJobs = [
  {
    id: 1,
    title: 'Desenvolvedor(a) Front-end Pleno',
    company: 'TechCorp',
    location: 'São Paulo, SP',
    workType: 'remote' as const,
    salaryMin: 10000,
    salaryMax: 15000,
    currency: 'BRL',
    skills: ['React', 'JavaScript', 'TypeScript'],
    postedAt: '2024-07-01T09:00:00Z',
    category: 'Tecnologia'
  },
  {
    id: 2,
    title: 'UX/UI Designer Sênior',
    company: 'InovaSoft',
    location: 'Remoto',
    workType: 'remote' as const,
    salaryMin: 8000,
    salaryMax: 12000,
    currency: 'BRL',
    skills: ['Figma', 'Design System', 'User Research'],
    postedAt: '2024-07-05T10:30:00Z',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Analista de Dados Júnior',
    company: 'DataPrime',
    location: 'Belo Horizonte, MG',
    workType: 'hybrid' as const,
    salaryMin: 6000,
    salaryMax: 9000,
    currency: 'BRL',
    skills: ['SQL', 'Python', 'Power BI'],
    postedAt: '2024-07-08T08:15:00Z',
    category: 'Dados'
  },
  {
    id: 4,
    title: 'Engenheiro(a) DevOps Pleno',
    company: 'CloudNine',
    location: 'Remoto (Brasil)',
    workType: 'remote' as const,
    salaryMin: 12000,
    salaryMax: 18000,
    currency: 'BRL',
    skills: ['AWS', 'Kubernetes', 'Docker'],
    postedAt: '2024-07-03T14:00:00Z',
    category: 'Tecnologia'
  },
  {
    id: 5,
    title: 'Desenvolvedor(a) Back-end Júnior',
    company: 'TechCorp',
    location: 'São Paulo, SP',
    workType: 'hybrid' as const,
    salaryMin: 7000,
    salaryMax: 10000,
    currency: 'BRL',
    skills: ['Node.js', 'Python', 'MongoDB'],
    postedAt: '2024-07-09T16:20:00Z',
    category: 'Tecnologia'
  }
];

const categories = ['Todas', 'Tecnologia', 'Design', 'Dados', 'Marketing'];

export const useJobsList = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Filtrar vagas baseado na busca e categoria
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Filtrar por categoria
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [jobs, selectedCategory, searchQuery]);

  // Simular carregamento inicial
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    jobs,
    filteredJobs,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
  };
};