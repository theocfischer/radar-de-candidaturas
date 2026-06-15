import * as companyService from '../services/companyService.js';

export async function index(req, res) {
  const companies = await companyService.listCompanies();
  res.json(companies);
}

export async function store(req, res) {
  const company = await companyService.createCompany(req.body);
  res.status(201).json(company);
}

export async function destroy(req, res) {
  const deleted = await companyService.deleteCompany(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Empresa não encontrada.' });
  res.status(204).send();
}
