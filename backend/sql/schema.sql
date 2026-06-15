DROP DATABASE IF EXISTS career_insight_hub;
CREATE DATABASE career_insight_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE career_insight_hub;

CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  sector VARCHAR(80),
  website VARCHAR(255),
  city VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  title VARCHAR(160) NOT NULL,
  area ENUM('Dados','Desenvolvimento','Suporte de Sistemas','QA','Risco/Fraude','Infraestrutura','Implantação','Outro') NOT NULL DEFAULT 'Outro',
  work_model ENUM('Remoto','Híbrido','Presencial') NOT NULL,
  location VARCHAR(120),
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  requires_degree BOOLEAN DEFAULT FALSE,
  requires_driver_license BOOLEAN DEFAULT FALSE,
  english_required BOOLEAN DEFAULT FALSE,
  fit_score TINYINT UNSIGNED,
  seniority ENUM('Entrada','Júnior','Pleno','Sênior','Não informado') DEFAULT 'Não informado',
  job_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  status ENUM('Salva','Candidatura enviada','Teste','Entrevista','Negativa','Oferta','Arquivada') DEFAULT 'Salva',
  applied_at DATE,
  source VARCHAR(80),
  custom_resume VARCHAR(80),
  next_step VARCHAR(255),
  rejection_reason VARCHAR(255),
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  category ENUM('Linguagem','Banco de Dados','Web','Dados','Ferramenta','Infra','Soft Skill','Outro') DEFAULT 'Outro'
);

CREATE TABLE job_skills (
  job_id INT NOT NULL,
  skill_id INT NOT NULL,
  importance ENUM('Obrigatório','Desejável') DEFAULT 'Desejável',
  PRIMARY KEY (job_id, skill_id),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE VIEW vw_job_overview AS
SELECT
  j.id,
  j.title,
  c.name AS company,
  c.sector AS company_sector,
  j.area,
  j.work_model,
  j.location,
  j.seniority,
  j.salary_min,
  j.salary_max,
  CASE
    WHEN j.salary_min IS NOT NULL AND j.salary_max IS NOT NULL THEN CONCAT('R$ ', REPLACE(FORMAT(j.salary_min, 0), ',', '.'), ' a R$ ', REPLACE(FORMAT(j.salary_max, 0), ',', '.'))
    WHEN j.salary_min IS NOT NULL THEN CONCAT('A partir de R$ ', REPLACE(FORMAT(j.salary_min, 0), ',', '.'))
    WHEN j.salary_max IS NOT NULL THEN CONCAT('Até R$ ', REPLACE(FORMAT(j.salary_max, 0), ',', '.'))
    ELSE 'Não informado'
  END AS salary_range,
  j.requires_degree,
  j.requires_driver_license,
  j.english_required,
  j.fit_score,
  a.status,
  a.applied_at,
  a.source,
  a.custom_resume,
  a.next_step,
  a.rejection_reason,
  a.notes AS application_notes
FROM jobs j
JOIN companies c ON c.id = j.company_id
LEFT JOIN applications a ON a.job_id = j.id;
