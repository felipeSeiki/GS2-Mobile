/**
 * Tipos relacionados à navegação da plataforma de recrutamento
 * Este arquivo contém todas as definições de tipos necessárias para a navegação entre telas
 */

/**
 * Define as rotas disponíveis na aplicação e seus parâmetros
 * @property Onboarding - Tela de boas-vindas
 * @property Login - Tela de login
 * @property Register - Tela de registro de candidato
 * @property CompanyRegister - Tela de registro de empresa
 * @property JobsList - Lista de vagas disponíveis
 * @property JobDetails - Detalhes de uma vaga específica
 * @property Applications - Minhas candidaturas
 */
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  CompanyRegister: undefined;
  JobsList: undefined;
  JobDetails: { jobId: string };
  Applications: undefined;
  CreateJob: undefined;
}; 