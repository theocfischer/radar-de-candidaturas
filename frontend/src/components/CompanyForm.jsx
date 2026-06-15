import React from 'react';

import { useState } from 'react';
import { api } from '../services/api.js';
import { Modal } from './Modal.jsx';

export function CompanyForm({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', sector: '', website: '', city: '' });
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');

    try {
      await api.createCompany(form);
      await onCreated();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal title="Nova empresa" onClose={onClose}>
      <form className="form-grid" onSubmit={submit}>
        {error && <div className="alert">{error}</div>}
        <label>Nome<input value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
        <label>Setor<input value={form.sector} onChange={(e) => update('sector', e.target.value)} /></label>
        <label>Site<input value={form.website} onChange={(e) => update('website', e.target.value)} /></label>
        <label>Cidade<input value={form.city} onChange={(e) => update('city', e.target.value)} /></label>
        <button className="button" type="submit">Salvar empresa</button>
      </form>
    </Modal>
  );
}
