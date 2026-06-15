import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDatabaseConnection } from './config/database.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

// Libera o frontend local para conversar com a API.
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', project: 'Radar de Candidaturas' });
});

app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/skills', skillRoutes);

// Middleware global de erro.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Erro interno do servidor.'
  });
});

async function bootstrap() {
  try {
    await testDatabaseConnection();
    app.listen(port, () => {
      console.log(`API do Radar de Candidaturas rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Não foi possível iniciar a API. Verifique o MySQL e o arquivo .env.');
    console.error(error.message);
    process.exit(1);
  }
}

bootstrap();
