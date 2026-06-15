import { pool } from '../config/database.js';
import { normalizeText, required } from '../utils/validators.js';

function toBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

function normalizeFitScore(value) {
  const number = toNumberOrNull(value);
  if (number === null) return null;
  return Math.min(100, Math.max(0, Math.round(number)));
}

export async function listJobs(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.area) {
    conditions.push('j.area = ?');
    params.push(filters.area);
  }

  if (filters.work_model) {
    conditions.push('j.work_model = ?');
    params.push(filters.work_model);
  }

  if (filters.status) {
    conditions.push('a.status = ?');
    params.push(filters.status);
  }

  if (filters.requires_degree !== undefined && filters.requires_degree !== '') {
    conditions.push('j.requires_degree = ?');
    params.push(toBoolean(filters.requires_degree) ? 1 : 0);
  }

  if (filters.requires_driver_license !== undefined && filters.requires_driver_license !== '') {
    conditions.push('j.requires_driver_license = ?');
    params.push(toBoolean(filters.requires_driver_license) ? 1 : 0);
  }

  if (filters.english_required !== undefined && filters.english_required !== '') {
    conditions.push('j.english_required = ?');
    params.push(toBoolean(filters.english_required) ? 1 : 0);
  }

  if (filters.only_viable === 'true') {
    conditions.push('j.requires_degree = 0 AND j.requires_driver_license = 0');
  }

  if (filters.search) {
    conditions.push('(j.title LIKE ? OR c.name LIKE ? OR j.location LIKE ? OR j.notes LIKE ?)');
    const term = `%${filters.search}%`;
    params.push(term, term, term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.query(
    `SELECT
      j.*,
      CASE
        WHEN j.salary_min IS NOT NULL AND j.salary_max IS NOT NULL THEN CONCAT('R$ ', REPLACE(FORMAT(j.salary_min, 0), ',', '.'), ' a R$ ', REPLACE(FORMAT(j.salary_max, 0), ',', '.'))
        WHEN j.salary_min IS NOT NULL THEN CONCAT('A partir de R$ ', REPLACE(FORMAT(j.salary_min, 0), ',', '.'))
        WHEN j.salary_max IS NOT NULL THEN CONCAT('Até R$ ', REPLACE(FORMAT(j.salary_max, 0), ',', '.'))
        ELSE 'Salário não informado'
      END AS salary_range,
      c.name AS company_name,
      c.sector AS company_sector,
      a.id AS application_id,
      a.status,
      a.applied_at,
      a.source,
      a.custom_resume,
      a.next_step,
      a.rejection_reason,
      a.notes AS application_notes
    FROM jobs j
    JOIN companies c ON c.id = j.company_id
    LEFT JOIN applications a ON a.job_id = j.id
    ${where}
    ORDER BY COALESCE(j.fit_score, 0) DESC, j.created_at DESC`,
    params
  );

  return rows;
}

export async function getJobById(id) {
  const [[job]] = await pool.query(
    `SELECT
       j.*,
       CASE
        WHEN j.salary_min IS NOT NULL AND j.salary_max IS NOT NULL THEN CONCAT('R$ ', REPLACE(FORMAT(j.salary_min, 0), ',', '.'), ' a R$ ', REPLACE(FORMAT(j.salary_max, 0), ',', '.'))
        WHEN j.salary_min IS NOT NULL THEN CONCAT('A partir de R$ ', REPLACE(FORMAT(j.salary_min, 0), ',', '.'))
        WHEN j.salary_max IS NOT NULL THEN CONCAT('Até R$ ', REPLACE(FORMAT(j.salary_max, 0), ',', '.'))
        ELSE 'Salário não informado'
       END AS salary_range,
       c.name AS company_name,
       c.sector AS company_sector
     FROM jobs j
     JOIN companies c ON c.id = j.company_id
     WHERE j.id = ?`,
    [id]
  );

  if (!job) return null;

  const [skills] = await pool.query(
    `SELECT s.id, s.name, s.category, js.importance
     FROM job_skills js
     JOIN skills s ON s.id = js.skill_id
     WHERE js.job_id = ?
     ORDER BY js.importance ASC, s.name ASC`,
    [id]
  );

  return { ...job, skills };
}

export async function createJob(payload) {
  required(payload.company_id, 'company_id');
  required(payload.title, 'title');
  required(payload.area, 'area');
  required(payload.work_model, 'work_model');

  const job = {
    company_id: Number(payload.company_id),
    title: normalizeText(payload.title),
    area: normalizeText(payload.area),
    work_model: normalizeText(payload.work_model),
    location: normalizeText(payload.location),
    salary_min: toNumberOrNull(payload.salary_min),
    salary_max: toNumberOrNull(payload.salary_max),
    requires_degree: toBoolean(payload.requires_degree),
    requires_driver_license: toBoolean(payload.requires_driver_license),
    english_required: toBoolean(payload.english_required),
    fit_score: normalizeFitScore(payload.fit_score),
    seniority: normalizeText(payload.seniority) || 'Não informado',
    job_url: normalizeText(payload.job_url),
    notes: normalizeText(payload.notes)
  };

  const [result] = await pool.query(
    `INSERT INTO jobs
    (company_id, title, area, work_model, location, salary_min, salary_max, requires_degree, requires_driver_license, english_required, fit_score, seniority, job_url, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      job.company_id,
      job.title,
      job.area,
      job.work_model,
      job.location,
      job.salary_min,
      job.salary_max,
      job.requires_degree,
      job.requires_driver_license,
      job.english_required,
      job.fit_score,
      job.seniority,
      job.job_url,
      job.notes
    ]
  );

  return { id: result.insertId, ...job };
}

export async function deleteJob(id) {
  const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
