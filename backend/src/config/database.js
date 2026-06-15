import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool de conexões com o MySQL.
// Usar pool é melhor do que abrir uma conexão nova manualmente a cada requisição.
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'career_insight_hub',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função simples para testar se o banco está acessível.
export async function testDatabaseConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    console.log('MySQL conectado com sucesso.');
  } finally {
    connection.release();
  }
}
