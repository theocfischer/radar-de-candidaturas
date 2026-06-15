const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro inesperado.' }));
    throw new Error(error.message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getDashboard: () => request('/dashboard/overview'),
  getCompanies: () => request('/companies'),
  createCompany: (data) => request('/companies', { method: 'POST', body: JSON.stringify(data) }),
  getJobs: (params = {}) => {
    const query = new URLSearchParams(params);
    return request(`/jobs?${query.toString()}`);
  },
  getJob: (id) => request(`/jobs/${id}`),
  createJob: (data) => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  saveApplication: (data) => request('/applications', { method: 'POST', body: JSON.stringify(data) }),
  getSkills: () => request('/skills'),
  attachSkill: (jobId, data) => request(`/skills/jobs/${jobId}`, { method: 'POST', body: JSON.stringify(data) })
};
