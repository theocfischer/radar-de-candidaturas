import { pool } from '../config/database.js';
import { normalizeText, required } from '../utils/validators.js';

export async function listSkills() {
  const [rows] = await pool.query('SELECT * FROM skills ORDER BY category, name');
  return rows;
}

export async function createSkill(payload) {
  required(payload.name, 'name');
  const skill = {
    name: normalizeText(payload.name),
    category: normalizeText(payload.category) || 'Outro'
  };

  const [result] = await pool.query(
    'INSERT INTO skills (name, category) VALUES (?, ?)',
    [skill.name, skill.category]
  );

  return { id: result.insertId, ...skill };
}

export async function attachSkillToJob(jobId, skillId, importance = 'Desejável') {
  await pool.query(
    `INSERT INTO job_skills (job_id, skill_id, importance)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE importance = VALUES(importance)`,
    [jobId, skillId, importance]
  );

  return { job_id: Number(jobId), skill_id: Number(skillId), importance };
}
