import { pool } from '../config/database.js';
import { normalizeText, required } from '../utils/validators.js';

export async function createOrUpdateApplication(payload) {
  required(payload.job_id, 'job_id');

  const application = {
    job_id: Number(payload.job_id),
    status: normalizeText(payload.status) || 'Salva',
    applied_at: payload.applied_at || null,
    source: normalizeText(payload.source),
    custom_resume: normalizeText(payload.custom_resume),
    next_step: normalizeText(payload.next_step),
    rejection_reason: normalizeText(payload.rejection_reason),
    notes: normalizeText(payload.notes)
  };

  // Regra simples do projeto: uma vaga tem, no máximo, um registro de candidatura.
  const [[existing]] = await pool.query('SELECT id FROM applications WHERE job_id = ?', [application.job_id]);

  if (existing) {
    await pool.query(
      `UPDATE applications
       SET status = ?, applied_at = ?, source = ?, custom_resume = ?, next_step = ?, rejection_reason = ?, notes = ?
       WHERE job_id = ?`,
      [
        application.status,
        application.applied_at,
        application.source,
        application.custom_resume,
        application.next_step,
        application.rejection_reason,
        application.notes,
        application.job_id
      ]
    );

    return { id: existing.id, ...application };
  }

  const [result] = await pool.query(
    `INSERT INTO applications (job_id, status, applied_at, source, custom_resume, next_step, rejection_reason, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      application.job_id,
      application.status,
      application.applied_at,
      application.source,
      application.custom_resume,
      application.next_step,
      application.rejection_reason,
      application.notes
    ]
  );

  return { id: result.insertId, ...application };
}
