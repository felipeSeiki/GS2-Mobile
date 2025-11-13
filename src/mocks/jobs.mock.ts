import { Job } from '../types/jobs';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor React Native',
    company: 'TechCorp',
    location: 'São Paulo, SP',
    category: 'Desenvolvimento',
    type: 'full-time',
    salary: 'R$ 8.000 - R$ 12.000',
    description: 'Estamos procurando um desenvolvedor React Native experiente para se juntar ao nosso time de desenvolvimento mobile.',
    requirements: [
      'Experiência com React Native',
      'Conhecimento em TypeScript',
      'Experiência com APIs REST',
      'Git e versionamento de código'
    ],
    benefits: [
      'Vale refeição',
      'Plano de saúde',
      'Home office flexível',
      'Auxílio educação'
    ],
    postedAt: new Date('2024-01-15'),
    applicationsCount: 5,
    isActive: true,
  },
  {
    id: '2',
    title: 'Designer UI/UX',
    company: 'DesignStudio',
    location: 'Rio de Janeiro, RJ',
    category: 'Design',
    type: 'full-time',
    salary: 'R$ 6.000 - R$ 9.000',
    description: 'Procuramos um designer criativo para criar experiências digitais incríveis.',
    requirements: [
      'Experiência com Figma',
      'Portfolio sólido',
      'Conhecimento em Design System',
      'Experiência em pesquisa com usuários'
    ],
    benefits: [
      'Vale refeição',
      'Plano de saúde',
      'Ambiente criativo',
      'Licença Adobe'
    ],
    postedAt: new Date('2024-01-14'),
    applicationsCount: 3,
    isActive: true,
  },
  {
    id: '3',
    title: 'Analista de Marketing Digital',
    company: 'MarketPro',
    location: 'Belo Horizonte, MG',
    category: 'Marketing',
    type: 'full-time',
    salary: 'R$ 4.500 - R$ 7.000',
    description: 'Buscamos um profissional para gerenciar campanhas digitais e análise de dados.',
    requirements: [
      'Experiência com Google Ads',
      'Conhecimento em Analytics',
      'Gestão de redes sociais',
      'Excel avançado'
    ],
    benefits: [
      'Vale refeição',
      'Plano de saúde',
      'Comissão por performance',
      'Cursos de atualização'
    ],
    postedAt: new Date('2024-01-13'),
    applicationsCount: 7,
    isActive: true,
  },
  {
    id: '4',
    title: 'Desenvolvedor Backend',
    company: 'ServerTech',
    location: 'Remoto',
    category: 'Desenvolvimento',
    type: 'full-time',
    salary: 'R$ 9.000 - R$ 15.000',
    description: 'Desenvolvedor backend sênior para arquitetar e desenvolver APIs escaláveis.',
    requirements: [
      'Node.js e TypeScript',
      'Experiência com MongoDB',
      'Docker e Kubernetes',
      'Arquitetura de microsserviços'
    ],
    benefits: [
      'Trabalho 100% remoto',
      'Plano de saúde premium',
      'Stock options',
      'Equipamentos fornecidos'
    ],
    postedAt: new Date('2024-01-12'),
    applicationsCount: 12,
    isActive: true,
  },
  {
    id: '5',
    title: 'Analista de Dados',
    company: 'DataCorp',
    location: 'São Paulo, SP',
    category: 'Dados',
    type: 'full-time',
    salary: 'R$ 7.000 - R$ 11.000',
    description: 'Profissional para análise de dados e criação de dashboards estratégicos.',
    requirements: [
      'Python e SQL',
      'Power BI ou Tableau',
      'Estatística aplicada',
      'Machine Learning básico'
    ],
    benefits: [
      'Vale refeição',
      'Plano de saúde',
      'Auxílio educação',
      'Participação nos lucros'
    ],
    postedAt: new Date('2024-01-11'),
    applicationsCount: 8,
    isActive: true,
  },
];