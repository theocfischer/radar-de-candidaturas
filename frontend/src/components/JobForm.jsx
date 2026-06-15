import React, { useState } from 'react';
import { api } from '../services/api.js';
import { Modal } from './Modal.jsx';

const initialState = {
  company_id: '',
  title: '',
  area: 'Suporte de Sistemas',
  work_model: 'Remoto',
  location: '',
  salary_min: '',
  salary_max: '',
  requires_degree: false,
  requires_driver_license: false,
  english_required: false,
  fit_score: '',
  seniority: 'Entrada',
  job_url: '',
  notes: ''
};

export function JobForm({ companies, onClose, onCreated }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      await api.createJob(form);
      await onCreated();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal title="Nova vaga" onClose={onClose}>
      <form className="form-grid two-columns" onSubmit={submit}>
        {error && <div className="alert full">{error}</div>}

        <label>Empresa
          <select value={form.company_id} onChange={(e) => update('company_id', e.target.value)}>
            <option value="">Selecione</option>
            {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
          </select>
        </label>

        <label>Cargo
          <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Ex.: Suporte de Sistemas Júnior" />
        </label>

        <label>Área
          <select value={form.area} onChange={(e) => update('area', e.target.value)}>
            <option>Dados</option>
            <option>Desenvolvimento</option>
            <option>Suporte de Sistemas</option>
            <option>QA</option>
            <option>Risco/Fraude</option>
            <option>Infraestrutura</option>
            <option>Implantação</option>
            <option>Outro</option>
          </select>
        </label>

        <label>Modelo
          <select value={form.work_model} onChange={(e) => update('work_model', e.target.value)}>
            <option>Remoto</option>
            <option>Híbrido</option>
            <option>Presencial</option>
          </select>
        </label>

        <label>Local
          <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Ex.: Porto Alegre, Remoto, Brasil" />
        </label>

        <label>Senioridade
          <select value={form.seniority} onChange={(e) => update('seniority', e.target.value)}>
            <option>Entrada</option>
            <option>Júnior</option>
            <option>Pleno</option>
            <option>Sênior</option>
            <option>Não informado</option>
          </select>
        </label>

        <label>Salário mínimo
          <input type="number" min="0" value={form.salary_min} onChange={(e) => update('salary_min', e.target.value)} />
        </label>

        <label>Salário máximo
          <input type="number" min="0" value={form.salary_max} onChange={(e) => update('salary_max', e.target.value)} />
        </label>

        <label>Aderência / compatibilidade (%)
          <input type="number" min="0" max="100" value={form.fit_score} onChange={(e) => update('fit_score', e.target.value)} placeholder="Ex.: 75" />
        </label>

        <label>Link da vaga
          <input value={form.job_url} onChange={(e) => update('job_url', e.target.value)} placeholder="https://..." />
        </label>

        <div className="checkbox-group full">
          <label><input type="checkbox" checked={form.requires_degree} onChange={(e) => update('requires_degree', e.target.checked)} /> Exige graduação?</label>
          <label><input type="checkbox" checked={form.requires_driver_license} onChange={(e) => update('requires_driver_license', e.target.checked)} /> Exige CNH?</label>
          <label><input type="checkbox" checked={form.english_required} onChange={(e) => update('english_required', e.target.checked)} /> Exige inglês?</label>
        </div>

        <label className="full">Observações
          <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Anote filtros, pontos fortes, riscos e próximos passos." />
        </label>

        <button className="button full" type="submit">Salvar vaga</button>
      </form>
    </Modal>
  );
}
