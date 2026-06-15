export const mockCompanies = [
  {
    id: 1,
    name: 'Empresa Exemplo Tech',
    sector: 'Tecnologia',
    city: 'Porto Alegre',
    notes: 'Empresa fictícia usada para demonstração.'
  },
  {
    id: 2,
    name: 'Sistemas Sul',
    sector: 'Software',
    city: 'Remoto',
    notes: 'Exemplo de empresa SaaS para vagas de suporte e implantação.'
  }
];

export const mockSkills = [
  { id: 1, name: 'JavaScript', category: 'Front-end' },
  { id: 2, name: 'React', category: 'Front-end' },
  { id: 3, name: 'Node.js', category: 'Back-end' },
  { id: 4, name: 'Express', category: 'Back-end' },
  { id: 5, name: 'SQL', category: 'Banco de dados' },
  { id: 6, name: 'MySQL', category: 'Banco de dados' },
  { id: 7, name: 'Python', category: 'Dados' },
  { id: 8, name: 'pandas', category: 'Dados' },
  { id: 9, name: 'Excel', category: 'Dados' },
  { id: 10, name: 'Atendimento', category: 'Suporte' },
  { id: 11, name: 'Testes manuais', category: 'QA' },
  { id: 12, name: 'APIs REST', category: 'Back-end' }
];

export const mockJobs = [
  {
    id: 1,
    company_id: 1,
    company_name: 'Empresa Exemplo Tech',
    title: 'Desenvolvedor Web Júnior',
    area: 'Desenvolvimento Web',
    work_model: 'Híbrido',
    location: 'Porto Alegre',
    seniority: 'Júnior',
    salary_min: 1800,
    salary_max: 2500,
    fit_score: 78,
    requires_degree: 0,
    requires_driver_license: 0,
    english_required: 1,
    link: 'https://exemplo.com/vaga-dev-web',
    notes: 'Vaga fictícia para demonstrar cadastro, filtros e aderência.',
    technologies: 'JavaScript, React, Node.js, SQL',
    application_status: 'enviada'
  },
  {
    id: 2,
    company_id: 2,
    company_name: 'Sistemas Sul',
    title: 'Suporte de Sistemas Júnior',
    area: 'Suporte de Sistemas',
    work_model: 'Remoto',
    location: 'Brasil',
    seniority: 'Entrada',
    salary_min: 1600,
    salary_max: 2200,
    fit_score: 84,
    requires_degree: 0,
    requires_driver_license: 0,
    english_required: 0,
    link: 'https://exemplo.com/vaga-suporte',
    notes: 'Exemplo de vaga com boa aderência para início em tecnologia.',
    technologies: 'SQL, atendimento, sistemas, chamados',
    application_status: 'entrevista'
  },
  {
    id: 3,
    company_id: 1,
    company_name: 'Empresa Exemplo Tech',
    title: 'QA Manual Júnior',
    area: 'QA/Testes',
    work_model: 'Remoto',
    location: 'Brasil',
    seniority: 'Júnior',
    salary_min: 1700,
    salary_max: 2400,
    fit_score: 70,
    requires_degree: 0,
    requires_driver_license: 0,
    english_required: 0,
    link: 'https://exemplo.com/vaga-qa',
    notes: 'Vaga fictícia para demonstrar área de testes.',
    technologies: 'testes manuais, documentação, bugs, SQL básico',
    application_status: 'salva'
  },
  {
    id: 4,
    company_id: 2,
    company_name: 'Sistemas Sul',
    title: 'Implantação de Sistemas',
    area: 'Suporte de Sistemas',
    work_model: 'Presencial',
    location: 'Porto Alegre',
    seniority: 'Entrada',
    salary_min: 1800,
    salary_max: 2600,
    fit_score: 45,
    requires_degree: 0,
    requires_driver_license: 1,
    english_required: 0,
    link: 'https://exemplo.com/vaga-implantacao',
    notes: 'Exemplo de vaga que pode ser cortada por exigir CNH.',
    technologies: 'SQL, sistemas, treinamento, suporte',
    application_status: 'cortada'
  }
];

export const mockApplications = [
  {
    id: 1,
    job_id: 1,
    status: 'enviada',
    applied_at: '2026-06-01',
    rejection_reason: null
  },
  {
    id: 2,
    job_id: 2,
    status: 'entrevista',
    applied_at: '2026-06-02',
    rejection_reason: null
  },
  {
    id: 3,
    job_id: 3,
    status: 'salva',
    applied_at: null,
    rejection_reason: null
  },
  {
    id: 4,
    job_id: 4,
    status: 'cortada',
    applied_at: null,
    rejection_reason: 'Exige CNH'
  }
];