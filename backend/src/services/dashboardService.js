import { pool } from '../config/database.js';

export async function getDashboardStats() {
  const [[totals]] = await pool.query(
    `SELECT
      COUNT(j.id) AS total_jobs,
      SUM(CASE WHEN a.id IS NOT NULL AND a.status <> 'Salva' THEN 1 ELSE 0 END) AS applications_started,
      SUM(CASE WHEN a.status = 'Candidatura enviada' THEN 1 ELSE 0 END) AS applications_sent,
      SUM(CASE WHEN a.status = 'Entrevista' THEN 1 ELSE 0 END) AS interviews,
      SUM(CASE WHEN a.status = 'Negativa' THEN 1 ELSE 0 END) AS rejections,
      SUM(CASE WHEN j.requires_degree = 1 THEN 1 ELSE 0 END) AS jobs_requiring_degree,
      SUM(CASE WHEN j.requires_driver_license = 1 THEN 1 ELSE 0 END) AS jobs_requiring_driver_license,
      SUM(CASE WHEN j.english_required = 1 THEN 1 ELSE 0 END) AS jobs_requiring_english,
      SUM(CASE WHEN j.work_model = 'Remoto' THEN 1 ELSE 0 END) AS remote_jobs,
      SUM(CASE WHEN j.requires_degree = 0 AND j.requires_driver_license = 0 THEN 1 ELSE 0 END) AS jobs_i_can_try,
      ROUND(AVG(j.fit_score), 1) AS avg_fit_score,
      AVG(CASE WHEN j.salary_min IS NOT NULL THEN j.salary_min END) AS avg_salary_min
     FROM jobs j
     LEFT JOIN applications a ON a.job_id = j.id`
  );

  const [byStatus] = await pool.query(
    `SELECT COALESCE(a.status, 'Sem candidatura') AS label, COUNT(j.id) AS total
     FROM jobs j
     LEFT JOIN applications a ON a.job_id = j.id
     GROUP BY COALESCE(a.status, 'Sem candidatura')
     ORDER BY total DESC, label ASC`
  );

  const [byArea] = await pool.query(
    `SELECT area AS label, COUNT(*) AS total
     FROM jobs
     GROUP BY area
     ORDER BY total DESC, area ASC`
  );

  const [byWorkModel] = await pool.query(
    `SELECT work_model AS label, COUNT(*) AS total
     FROM jobs
     GROUP BY work_model
     ORDER BY total DESC, work_model ASC`
  );

  const [topSkills] = await pool.query(
    `SELECT s.name AS label, COUNT(*) AS total
     FROM job_skills js
     JOIN skills s ON s.id = js.skill_id
     GROUP BY s.name
     ORDER BY total DESC, s.name ASC
     LIMIT 10`
  );

  return { totals, byStatus, byArea, byWorkModel, topSkills };
}
