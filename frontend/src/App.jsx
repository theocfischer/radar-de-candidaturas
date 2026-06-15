import React, { useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, ChartNoAxesCombined, Database, Plus, Search } from 'lucide-react';
import { api } from './services/api.js';
import { StatCard } from './components/StatCard.jsx';
import { JobCard } from './components/JobCard.jsx';
import { JobForm } from './components/JobForm.jsx';
import { CompanyForm } from './components/CompanyForm.jsx';
import { BarList } from './components/BarList.jsx';

const emptyFilters = {
  search: '',
  area: '',
  work_model: '',
  status: '',
  only_viable: '',
  requires_degree: '',
  requires_driver_license: '',
  english_required: ''
};

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData(activeFilters = filters) {
    setLoading(true);
    setError('');

    try {
      const [dashboardData, jobsData, companiesData] = await Promise.all([
        api.getDashboard(),
        api.getJobs(activeFilters),
        api.getCompanies()
      ]);

      setDashboard(dashboardData);
      setJobs(jobsData);
      setCompanies(companiesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const hasActiveFilter = useMemo(() => {
    return Object.values(filters).some(Boolean);
  }, [filters]);

  function updateFilter(field, value) {
    const nextFilters = { ...filters, [field]: value };
    setFilters(nextFilters);
    loadData(nextFilters);
  }

  async function handleJobCreated() {
    setIsJobFormOpen(false);
    await loadData();
  }

  async function handleCompanyCreated() {
    setIsCompanyFormOpen(false);
    await loadData();
  }

  return (
    <main className="app-shell">
      <section className="hero panel">
        <div>
          <p className="eyebrow">Projeto pessoal full-stack</p>
          <h1>Radar de Candidaturas</h1>
          <p className="hero-text">
            Organize vagas, acompanhe candidaturas e transforme sua busca por emprego em dados.
          </p>
        </div>

        <div className="hero-actions">
          <button className="button secondary" onClick={() => setIsCompanyFormOpen(true)}>
            <Plus size={18} /> Empresa
          </button>
          <button className="button" onClick={() => setIsJobFormOpen(true)}>
            <Plus size={18} /> Vaga
          </button>
        </div>
      </section>

      {error && <div className="alert">{error}</div>}

      <section className="stats-grid">
        <StatCard icon={BriefcaseBusiness} label="Vagas mapeadas" value={dashboard?.totals?.total_jobs || 0} />
        <StatCard icon={ChartNoAxesCombined} label="Posso tentar" value={dashboard?.totals?.jobs_i_can_try || 0} />
        <StatCard icon={Database} label="Candidaturas enviadas" value={dashboard?.totals?.applications_sent || 0} />
        <StatCard icon={BriefcaseBusiness} label="Entrevistas" value={dashboard?.totals?.interviews || 0} />
        <StatCard icon={Database} label="Exigem graduação" value={dashboard?.totals?.jobs_requiring_degree || 0} />
        <StatCard icon={Database} label="Exigem CNH" value={dashboard?.totals?.jobs_requiring_driver_license || 0} />
        <StatCard icon={ChartNoAxesCombined} label="Exigem inglês" value={dashboard?.totals?.jobs_requiring_english || 0} />
        <StatCard icon={ChartNoAxesCombined} label="Aderência média" value={dashboard?.totals?.avg_fit_score ? `${dashboard.totals.avg_fit_score}%` : '—'} />
      </section>

      <section className="content-grid">
        <div className="panel main-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Candidaturas</p>
              <h2>Vagas e status</h2>
            </div>
            {hasActiveFilter && (
              <button className="ghost" onClick={() => { setFilters(emptyFilters); loadData(emptyFilters); }}>
                limpar filtros
              </button>
            )}
          </div>

          <div className="filters">
            <label className="search-field">
              <Search size={16} />
              <input
                value={filters.search}
                onChange={(event) => updateFilter('search', event.target.value)}
                placeholder="Buscar por cargo, empresa, cidade ou observação"
              />
            </label>

            <select value={filters.area} onChange={(event) => updateFilter('area', event.target.value)}>
              <option value="">Todas as áreas</option>
              <option>Dados</option>
              <option>Desenvolvimento</option>
              <option>Suporte de Sistemas</option>
              <option>QA</option>
              <option>Risco/Fraude</option>
              <option>Infraestrutura</option>
              <option>Implantação</option>
              <option>Outro</option>
            </select>

            <select value={filters.work_model} onChange={(event) => updateFilter('work_model', event.target.value)}>
              <option value="">Todos os modelos</option>
              <option>Remoto</option>
              <option>Híbrido</option>
              <option>Presencial</option>
            </select>

            <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
              <option value="">Todos os status</option>
              <option>Salva</option>
              <option>Candidatura enviada</option>
              <option>Teste</option>
              <option>Entrevista</option>
              <option>Negativa</option>
              <option>Oferta</option>
              <option>Arquivada</option>
            </select>

            <select value={filters.only_viable} onChange={(event) => updateFilter('only_viable', event.target.value)}>
              <option value="">Todas as possibilidades</option>
              <option value="true">Sem graduação e sem CNH</option>
            </select>

            <select value={filters.requires_degree} onChange={(event) => updateFilter('requires_degree', event.target.value)}>
              <option value="">Graduação: tanto faz</option>
              <option value="false">Não exige graduação</option>
              <option value="true">Exige graduação</option>
            </select>

            <select value={filters.requires_driver_license} onChange={(event) => updateFilter('requires_driver_license', event.target.value)}>
              <option value="">CNH: tanto faz</option>
              <option value="false">Não exige CNH</option>
              <option value="true">Exige CNH</option>
            </select>

            <select value={filters.english_required} onChange={(event) => updateFilter('english_required', event.target.value)}>
              <option value="">Inglês: tanto faz</option>
              <option value="false">Não exige inglês</option>
              <option value="true">Exige inglês</option>
            </select>
          </div>

          {loading ? (
            <p className="muted">Carregando dados...</p>
          ) : (
            <div className="job-list">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onChange={loadData} />
              ))}
              {!jobs.length && <p className="muted">Nenhuma vaga encontrada com os filtros atuais.</p>}
            </div>
          )}
        </div>

        <aside className="panel side-panel">
          <p className="eyebrow">Análises rápidas</p>
          <h2>Distribuição</h2>
          <BarList title="Por status" items={dashboard?.byStatus || []} />
          <BarList title="Por área" items={dashboard?.byArea || []} />
          <BarList title="Por modelo" items={dashboard?.byWorkModel || []} />
          <BarList title="Tecnologias mais citadas" items={dashboard?.topSkills || []} />
        </aside>
      </section>

      {isJobFormOpen && (
        <JobForm companies={companies} onClose={() => setIsJobFormOpen(false)} onCreated={handleJobCreated} />
      )}

      {isCompanyFormOpen && (
        <CompanyForm onClose={() => setIsCompanyFormOpen(false)} onCreated={handleCompanyCreated} />
      )}
    </main>
  );
}
