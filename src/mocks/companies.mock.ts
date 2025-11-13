export interface Company {
  id: string;
  name: string;
  email: string;
  password: string;
  description: string;
  industry: string;
  location: string;
  website?: string;
  logo?: string;
  foundedYear?: number;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
}

export const mockCompanies: Company[] = [
  {
    id: 'company1',
    name: 'TechCorp',
    email: 'rh@techcorp.com',
    password: '123456',
    description: 'Empresa de tecnologia focada em desenvolvimento de soluções inovadoras para o mercado mobile.',
    industry: 'Tecnologia',
    location: 'São Paulo, SP',
    website: 'https://techcorp.com',
    foundedYear: 2018,
    size: 'medium',
  },
  {
    id: 'company2',
    name: 'DesignStudio',
    email: 'contato@designstudio.com',
    password: '123456',
    description: 'Estúdio de design especializado em experiências digitais e interfaces de usuário.',
    industry: 'Design',
    location: 'Rio de Janeiro, RJ',
    website: 'https://designstudio.com',
    foundedYear: 2020,
    size: 'small',
  },
  {
    id: 'company3',
    name: 'MarketPro',
    email: 'rh@marketpro.com',
    password: '123456',
    description: 'Agência de marketing digital com foco em performance e crescimento de negócios.',
    industry: 'Marketing',
    location: 'Belo Horizonte, MG',
    website: 'https://marketpro.com',
    foundedYear: 2019,
    size: 'medium',
  },
  {
    id: 'company4',
    name: 'ServerTech',
    email: 'jobs@servertech.com',
    password: '123456',
    description: 'Especialista em infraestrutura cloud e desenvolvimento de APIs escaláveis.',
    industry: 'Tecnologia',
    location: 'Remoto',
    website: 'https://servertech.com',
    foundedYear: 2017,
    size: 'large',
  },
  {
    id: 'company5',
    name: 'DataCorp',
    email: 'talentos@datacorp.com',
    password: '123456',
    description: 'Empresa focada em análise de dados, business intelligence e machine learning.',
    industry: 'Dados',
    location: 'São Paulo, SP',
    website: 'https://datacorp.com',
    foundedYear: 2016,
    size: 'large',
  },
  {
    id: 'company6',
    name: 'StartupHub',
    email: 'team@startuphub.com',
    password: '123456',
    description: 'Plataforma de inovação conectando startups e investidores.',
    industry: 'Tecnologia',
    location: 'Florianópolis, SC',
    website: 'https://startuphub.com',
    foundedYear: 2021,
    size: 'startup',
  },
  {
    id: 'company7',
    name: 'GreenTech Solutions',
    email: 'careers@greentech.com',
    password: '123456',
    description: 'Soluções sustentáveis em tecnologia para um futuro mais verde.',
    industry: 'Sustentabilidade',
    location: 'Curitiba, PR',
    website: 'https://greentech.com',
    foundedYear: 2020,
    size: 'small',
  },
  {
    id: 'company8',
    name: 'FinanceFlow',
    email: 'rh@financeflow.com',
    password: '123456',
    description: 'Fintech inovadora oferecendo soluções financeiras para PMEs.',
    industry: 'Fintech',
    location: 'São Paulo, SP',
    website: 'https://financeflow.com',
    foundedYear: 2019,
    size: 'medium',
  },
];