import { pool } from '../config/database.js';
import { normalizeText, required } from '../utils/validators.js';

export async function listCompanies() {
  const [rows] = await pool.query('SELECT * FROM companies ORDER BY name ASC');
  return rows;
}

export async function createCompany(payload) {
  required(payload.name, 'name');

  const company = {
    name: normalizeText(payload.name),
    sector: normalizeText(payload.sector),
    website: normalizeText(payload.website),
    city: normalizeText(payload.city)
  };

  const [result] = await pool.query(
    'INSERT INTO companies (name, sector, website, city) VALUES (?, ?, ?, ?)',
    [company.name, company.sector, company.website, company.city]
  );

  return { id: result.insertId, ...company };
}

export async function deleteCompany(id) {
  const [result] = await pool.query('DELETE FROM companies WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
