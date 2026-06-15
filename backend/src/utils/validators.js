export function required(value, fieldName) {
  if (value === undefined || value === null || String(value).trim() === '') {
    const error = new Error(`O campo "${fieldName}" é obrigatório.`);
    error.status = 400;
    throw error;
  }
}

export function normalizeText(value) {
  if (value === undefined || value === null) return null;
  return String(value).trim();
}
