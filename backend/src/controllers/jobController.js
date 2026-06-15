import * as jobService from '../services/jobService.js';

export async function index(req, res) {
  const jobs = await jobService.listJobs(req.query);
  res.json(jobs);
}

export async function show(req, res) {
  const job = await jobService.getJobById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Vaga não encontrada.' });
  res.json(job);
}

export async function store(req, res) {
  const job = await jobService.createJob(req.body);
  res.status(201).json(job);
}

export async function destroy(req, res) {
  const deleted = await jobService.deleteJob(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Vaga não encontrada.' });
  res.status(204).send();
}
