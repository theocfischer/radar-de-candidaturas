USE career_insight_hub;

INSERT INTO companies (name, sector, website, city) VALUES
('Nuvem Sul Sistemas', 'Software / SaaS', 'https://example.com/nuvem-sul', 'Porto Alegre'),
('Dados do Pampa', 'Dados e BI', 'https://example.com/dados-pampa', 'Remoto'),
('Oficina Digital RS', 'Tecnologia', 'https://example.com/oficina-digital', 'Porto Alegre'),
('Conecta Saúde Sistemas', 'Software para saúde', 'https://example.com/conecta-saude', 'Híbrido - RS'),
('Atlântico Helpdesk', 'Suporte técnico', 'https://example.com/atlantico-helpdesk', 'Remoto'),
('Fronteira QA Lab', 'Qualidade de software', 'https://example.com/fronteira-qa', 'Porto Alegre'),
('Sistemas Horizonte', 'Implantação de sistemas', 'https://example.com/sistemas-horizonte', 'Rio Grande / Remoto'),
('Risco Claro Tech', 'Risco e prevenção', 'https://example.com/risco-claro', 'Porto Alegre');

INSERT INTO jobs
(company_id, title, area, work_model, location, salary_min, salary_max, requires_degree, requires_driver_license, english_required, fit_score, seniority, job_url, notes)
VALUES
(1, 'Suporte de Sistemas Júnior', 'Suporte de Sistemas', 'Híbrido', 'Porto Alegre', 2200, 3000, false, false, false, 82, 'Júnior', 'https://example.com/vaga-suporte-sistemas-jr', 'Boa vaga para usar SQL básico, atendimento técnico e noções de API. Parece realista para primeira oportunidade.'),
(2, 'Assistente de Dados', 'Dados', 'Remoto', 'Brasil', 2100, 3200, false, false, false, 78, 'Entrada', 'https://example.com/vaga-assistente-dados', 'Pede Excel, SQL e Python básico. Dá para conectar com o projeto de análise ambiental da Lagoa dos Patos.'),
(3, 'Desenvolvedor Web Júnior', 'Desenvolvimento', 'Híbrido', 'Porto Alegre', 2600, 4200, false, false, true, 70, 'Júnior', 'https://example.com/vaga-dev-web-jr', 'Stack próxima: HTML, CSS, JavaScript, Node.js, MySQL e algum React.'),
(4, 'Suporte SaaS N1', 'Suporte de Sistemas', 'Remoto', 'Brasil', 2000, 2800, false, false, false, 86, 'Entrada', 'https://example.com/vaga-suporte-saas-n1', 'Atendimento técnico, troubleshooting, sistemas web e registro de chamados.'),
(5, 'QA Manual Júnior', 'QA', 'Remoto', 'Brasil', 2300, 3400, false, false, false, 68, 'Júnior', 'https://example.com/vaga-qa-manual-jr', 'Boa para estudar testes manuais, critérios de aceite, documentação de bugs e Postman.'),
(6, 'Assistente de Implantação de Sistemas', 'Implantação', 'Presencial', 'Porto Alegre', 2100, 3000, false, true, false, 58, 'Entrada', 'https://example.com/vaga-implantacao-sistemas', 'Interessante, mas CNH pode ser motivo de corte. Registrar para acompanhar padrão de exigências.'),
(7, 'Analista de Risco Júnior', 'Risco/Fraude', 'Híbrido', 'Porto Alegre', 2800, 3900, true, false, false, 52, 'Júnior', 'https://example.com/vaga-risco-jr', 'Tem ligação com dados, mas graduação pode pesar. Vale salvar para comparar requisitos.'),
(8, 'Técnico de Suporte em Campo', 'Infraestrutura', 'Presencial', 'Porto Alegre', 2200, 3100, false, true, false, 45, 'Entrada', 'https://example.com/vaga-suporte-campo', 'Pode ser boa para hardware e suporte, mas exige deslocamento e CNH.'),
(2, 'Estagiário de BI', 'Dados', 'Híbrido', 'Porto Alegre', 1200, 1600, true, false, false, 35, 'Entrada', 'https://example.com/vaga-estagio-bi', 'Exemplo mantido para mostrar por que estágio/graduação pode não encaixar no momento.'),
(3, 'Desenvolvedor Front-end Júnior', 'Desenvolvimento', 'Remoto', 'Brasil', 2500, 3800, false, false, true, 64, 'Júnior', 'https://example.com/vaga-front-end-jr', 'Boa para estudar React sem vender o projeto como algo sênior demais.');

INSERT INTO applications (job_id, status, applied_at, source, custom_resume, next_step, rejection_reason, notes) VALUES
(1, 'Entrevista', '2026-05-30', 'LinkedIn', 'Suporte/Sistemas', 'Revisar respostas sobre SQL, atendimento e projetos pessoais', NULL, 'Vaga com boa aderência.'),
(2, 'Candidatura enviada', '2026-05-29', 'Gupy', 'Dados/Python', 'Aguardar retorno', NULL, 'Currículo destacando estágio FURG e pandas.'),
(3, 'Salva', NULL, 'LinkedIn', 'Web/Node', 'Melhorar ProjetoQuadrasIFRS antes de aplicar', NULL, 'Talvez precise reforçar React.'),
(4, 'Candidatura enviada', '2026-05-31', 'Indeed', 'Suporte/Sistemas', 'Acompanhar e-mail', NULL, 'Boa para primeira oportunidade.'),
(5, 'Teste', '2026-05-28', 'LinkedIn', 'QA/Suporte', 'Estudar casos de teste e bug report', NULL, 'Pediram noções de Postman.'),
(6, 'Arquivada', NULL, 'Site da empresa', 'Suporte/Sistemas', 'Nenhum', 'Exigia CNH para atendimento externo', 'Arquivada por incompatibilidade prática.'),
(7, 'Negativa', '2026-05-20', 'Gupy', 'Dados/Python', 'Registrar aprendizado', 'Graduação em andamento/concluída apareceu como filtro', 'Boa para entender filtros de candidatura.'),
(8, 'Salva', NULL, 'Facebook/Grupo de vagas', 'Suporte técnico', 'Avaliar deslocamento', NULL, 'Pode não valer pela CNH.'),
(9, 'Arquivada', NULL, 'LinkedIn', 'Dados/Python', 'Nenhum', 'Estágio exige matrícula ativa', 'Exemplo de vaga que parece boa, mas não serve se não houver matrícula ativa.'),
(10, 'Salva', NULL, 'LinkedIn', 'Web/Node', 'Estudar React e revisar portfólio', NULL, 'Boa referência para sprint de front-end.');

INSERT INTO skills (name, category) VALUES
('HTML', 'Web'),
('CSS', 'Web'),
('JavaScript', 'Linguagem'),
('React', 'Web'),
('Node.js', 'Web'),
('Express', 'Web'),
('API REST', 'Web'),
('SQL', 'Banco de Dados'),
('MySQL', 'Banco de Dados'),
('Python', 'Linguagem'),
('pandas', 'Dados'),
('Matplotlib', 'Dados'),
('Jupyter Notebook', 'Dados'),
('Excel', 'Ferramenta'),
('Power BI', 'Dados'),
('Git', 'Ferramenta'),
('GitHub', 'Ferramenta'),
('Postman', 'Ferramenta'),
('Atendimento técnico', 'Soft Skill'),
('Documentação', 'Soft Skill'),
('Linux', 'Infra'),
('Windows', 'Infra'),
('Redes básicas', 'Infra');

INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 1, id, 'Obrigatório' FROM skills WHERE name IN ('SQL','MySQL','Atendimento técnico','Documentação');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 2, id, 'Obrigatório' FROM skills WHERE name IN ('Python','pandas','SQL','Excel');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 3, id, 'Obrigatório' FROM skills WHERE name IN ('HTML','CSS','JavaScript','Node.js','MySQL','Git');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 3, id, 'Desejável' FROM skills WHERE name IN ('React','API REST','GitHub');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 4, id, 'Obrigatório' FROM skills WHERE name IN ('SQL','API REST','Atendimento técnico','Documentação');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 5, id, 'Obrigatório' FROM skills WHERE name IN ('Postman','Documentação','API REST');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 6, id, 'Obrigatório' FROM skills WHERE name IN ('SQL','Atendimento técnico','Documentação');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 7, id, 'Obrigatório' FROM skills WHERE name IN ('SQL','Excel','Python');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 8, id, 'Obrigatório' FROM skills WHERE name IN ('Windows','Redes básicas','Atendimento técnico');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 9, id, 'Obrigatório' FROM skills WHERE name IN ('Power BI','Excel','SQL');
INSERT INTO job_skills (job_id, skill_id, importance)
SELECT 10, id, 'Obrigatório' FROM skills WHERE name IN ('HTML','CSS','JavaScript','React','GitHub');
