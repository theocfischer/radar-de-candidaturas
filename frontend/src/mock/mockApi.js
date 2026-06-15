import { mockCompanies, mockJobs, mockSkills } from './mockData';

let companies = [...mockCompanies];
let skills = [...mockSkills];

function buildSalaryRange(job) {
  const min = Number(job.salary_min);
  const max = Number(job.salary_max);

  if (!Number.isNaN(min) && min > 0 && !Number.isNaN(max) && max > 0) {
    return `R$ ${min.toLocaleString('pt-BR')} a R$ ${max.toLocaleString('pt-BR')}`;
  }

  if (!Number.isNaN(min) && min > 0) {
    return `A partir de R$ ${min.toLocaleString('pt-BR')}`;
  }

  if (!Number.isNaN(max) && max > 0) {
    return `Até R$ ${max.toLocaleString('pt-BR')}`;
  }

  return 'Salário não informado';
}

function normalizeStatus(status) {
  const value = String(status || '').toLowerCase().trim();

  if (value === 'salva') return 'Salva';
  if (value === 'enviada' || value === 'candidatura enviada') return 'Candidatura enviada';
  if (value === 'teste') return 'Teste';
  if (value === 'entrevista') return 'Entrevista';
  if (value === 'negativa' || value === 'rejeitada') return 'Negativa';
  if (value === 'oferta') return 'Oferta';
  if (value === 'arquivada' || value === 'cortada') return 'Arquivada';

  return 'Salva';
}

function normalizeJob(job) {
  return {
    ...job,
    company_name: job.company_name || 'Empresa não informada',
    status: normalizeStatus(job.status || job.application_status),
    salary_range: job.salary_range || buildSalaryRange(job),
    job_url: job.job_url || job.link || '',
    requires_degree: Number(job.requires_degree) === 1,
    requires_driver_license: Number(job.requires_driver_license) === 1,
    english_required: Number(job.english_required) === 1,
    fit_score:
      job.fit_score === null || job.fit_score === undefined || job.fit_score === ''
        ? null
        : Number(job.fit_score)
  };
}

let jobs = mockJobs.map(normalizeJob);

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

function normalizeText(value) {
  return String(value || '').toLowerCase().trim();
}

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) return null;

  const number = Number(value);

  return Number.isNaN(number) ? null : number;
}

function matchesBooleanFilter(value, filter) {
  if (filter === '' || filter === undefined || filter === null) {
    return true;
  }

  const booleanValue = value === true || Number(value) === 1;

  if (filter === 'true') {
    return booleanValue;
  }

  if (filter === 'false') {
    return !booleanValue;
  }

  return true;
}

function countBy(list, field) {
  const counts = {};

  list.forEach((item) => {
    const label = item[field] || 'Não informado';
    counts[label] = (counts[label] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
}

function getTopSkills() {
  const counts = {};

  jobs.forEach((job) => {
    const technologies = job.technologies || '';

    technologies.split(',').forEach((technology) => {
      const label = technology.trim();

      if (!label) return;

      counts[label] = (counts[label] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label))
    .slice(0, 10);
}

function calculateDashboard() {
  const fitScores = jobs
    .map((job) => Number(job.fit_score))
    .filter((score) => !Number.isNaN(score));

  const avgFitScore = fitScores.length
    ? Math.round((fitScores.reduce((sum, score) => sum + score, 0) / fitScores.length) * 10) / 10
    : null;

  return {
    totals: {
      total_jobs: jobs.length,
      applications_started: jobs.filter((job) => job.status !== 'Salva').length,
      applications_sent: jobs.filter((job) => job.status === 'Candidatura enviada').length,
      interviews: jobs.filter((job) => job.status === 'Entrevista').length,
      rejections: jobs.filter((job) => job.status === 'Negativa').length,
      jobs_requiring_degree: jobs.filter((job) => job.requires_degree).length,
      jobs_requiring_driver_license: jobs.filter((job) => job.requires_driver_license).length,
      jobs_requiring_english: jobs.filter((job) => job.english_required).length,
      remote_jobs: jobs.filter((job) => job.work_model === 'Remoto').length,
      jobs_i_can_try: jobs.filter((job) => !job.requires_degree && !job.requires_driver_license).length,
      avg_fit_score: avgFitScore
    },
    byStatus: countBy(jobs, 'status'),
    byArea: countBy(jobs, 'area'),
    byWorkModel: countBy(jobs, 'work_model'),
    topSkills: getTopSkills()
  };
}

function applyJobFilters(list, params = {}) {
  return list.filter((job) => {
    const search = normalizeText(params.search);

    if (search) {
      const searchableText = normalizeText(
        `${job.title} ${job.company_name} ${job.location} ${job.area} ${job.technologies} ${job.notes}`
      );

      if (!searchableText.includes(search)) {
        return false;
      }
    }

    if (params.area && job.area !== params.area) {
      return false;
    }

    if (params.work_model && job.work_model !== params.work_model) {
      return false;
    }

    if (params.status && job.status !== params.status) {
      return false;
    }

    if (params.only_viable === 'true' && (job.requires_degree || job.requires_driver_license)) {
      return false;
    }

    if (!matchesBooleanFilter(job.requires_degree, params.requires_degree)) {
      return false;
    }

    if (!matchesBooleanFilter(job.requires_driver_license, params.requires_driver_license)) {
      return false;
    }

    if (!matchesBooleanFilter(job.english_required, params.english_required)) {
      return false;
    }

    return true;
  });
}

export const mockApi = {
  async getDashboard() {
    await wait();
    return calculateDashboard();
  },

  async getCompanies() {
    await wait();
    return companies;
  },

  async createCompany(payload) {
    await wait();

    const newCompany = {
      id: Date.now(),
      ...payload
    };

    companies = [newCompany, ...companies];

    return newCompany;
  },

  async getJobs(params = {}) {
    await wait();
    return applyJobFilters(jobs, params);
  },

  async getJob(id) {
    await wait();

    return jobs.find((job) => Number(job.id) === Number(id)) || null;
  },

  async createJob(payload) {
    await wait();

    const company = companies.find((item) => Number(item.id) === Number(payload.company_id));

    const newJob = normalizeJob({
      id: Date.now(),
      company_id: Number(payload.company_id),
      company_name: company?.name || 'Empresa não informada',
      title: payload.title || 'Vaga sem título',
      area: payload.area || 'Outro',
      work_model: payload.work_model || 'Remoto',
      location: payload.location || 'Não informado',
      seniority: payload.seniority || 'Não informado',
      salary_min: toNumberOrNull(payload.salary_min),
      salary_max: toNumberOrNull(payload.salary_max),
      requires_degree: payload.requires_degree ? 1 : 0,
      requires_driver_license: payload.requires_driver_license ? 1 : 0,
      english_required: payload.english_required ? 1 : 0,
      fit_score: toNumberOrNull(payload.fit_score),
      job_url: payload.job_url || '',
      notes: payload.notes || '',
      technologies: payload.technologies || '',
      status: 'Salva',
      rejection_reason: null
    });

    jobs = [newJob, ...jobs];

    return newJob;
  },

  async saveApplication(data) {
    await wait();

    jobs = jobs.map((job) => {
      if (Number(job.id) !== Number(data.job_id)) {
        return job;
      }

      return {
        ...job,
        status: normalizeStatus(data.status),
        applied_at: data.applied_at || job.applied_at || null,
        source: data.source || job.source || 'Manual',
        custom_resume: data.custom_resume || job.custom_resume || 'Não informado',
        next_step: data.next_step || job.next_step || '',
        rejection_reason: data.rejection_reason || job.rejection_reason || '',
        application_notes: data.notes || job.application_notes || ''
      };
    });

    return jobs.find((job) => Number(job.id) === Number(data.job_id));
  },

  async getSkills() {
    await wait();
    return skills;
  },

  async attachSkill(jobId, data) {
    await wait();

    const skill = skills.find((item) => Number(item.id) === Number(data.skill_id));

    if (!skill) {
      return null;
    }

    jobs = jobs.map((job) => {
      if (Number(job.id) !== Number(jobId)) {
        return job;
      }

      const currentTechnologies = job.technologies
        ? job.technologies.split(',').map((item) => item.trim()).filter(Boolean)
        : [];

      if (!currentTechnologies.includes(skill.name)) {
        currentTechnologies.push(skill.name);
      }

      return {
        ...job,
        technologies: currentTechnologies.join(', ')
      };
    });

    return {
      job_id: Number(jobId),
      skill_id: Number(data.skill_id),
      skill_name: skill.name
    };
  }
};