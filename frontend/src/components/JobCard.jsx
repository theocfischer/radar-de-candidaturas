import React from 'react';
import { api } from '../services/api.js';

const statusOptions = ['Salva', 'Candidatura enviada', 'Teste', 'Entrevista', 'Negativa', 'Oferta', 'Arquivada'];

function yesNoBadge(condition, positiveText, negativeText) {
  return condition ? positiveText : negativeText;
}

export function JobCard({ job, onChange }) {
  async function updateStatus(status) {
    await api.saveApplication({
      job_id: job.id,
      status,
      applied_at: status === 'Salva' ? (job.applied_at || null) : (job.applied_at || new Date().toISOString().slice(0, 10)),
      source: job.source || 'Manual',
      custom_resume: job.custom_resume || 'Não informado',
      next_step: job.next_step || '',
      rejection_reason: job.rejection_reason || '',
      notes: job.application_notes || ''
    });

    await onChange();
  }

  return (
    <article className="job-card">
      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <p>{job.company_name} · {job.area}</p>
        </div>
        <span className={`badge ${job.work_model.toLowerCase()}`}>{job.work_model}</span>
      </div>

      <div className="job-meta">
        <span>{job.location || 'Local não informado'}</span>
        <span>{job.seniority}</span>
        <span>{job.salary_range || 'Salário não informado'}</span>
        <span>{yesNoBadge(job.requires_degree, 'Exige graduação', 'Sem graduação obrigatória')}</span>
        <span>{yesNoBadge(job.requires_driver_license, 'Exige CNH', 'Sem CNH obrigatória')}</span>
        <span>{yesNoBadge(job.english_required, 'Exige inglês', 'Inglês não obrigatório')}</span>
        {job.fit_score !== null && job.fit_score !== undefined && <span>Aderência: {job.fit_score}%</span>}
      </div>

      {job.notes && <p className="job-notes">{job.notes}</p>}
      {job.rejection_reason && <p className="job-cut-reason">Motivo de corte: {job.rejection_reason}</p>}

      <div className="job-footer">
        <select value={job.status || 'Salva'} onChange={(event) => updateStatus(event.target.value)}>
          {statusOptions.map((status) => <option key={status}>{status}</option>)}
        </select>
        {job.job_url && <a href={job.job_url} target="_blank" rel="noreferrer">abrir vaga</a>}
      </div>
    </article>
  );
}
