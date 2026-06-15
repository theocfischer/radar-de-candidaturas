# Radar de Candidaturas

O **Radar de Candidaturas** é um projeto pessoal em desenvolvimento, criado para organizar minha busca por vagas e praticar desenvolvimento full stack. A aplicação permite cadastrar empresas e oportunidades, acompanhar status de candidaturas, filtrar requisitos importantes e visualizar métricas sobre a busca por emprego.

A ideia é transformar um problema real — procurar a primeira oportunidade em tecnologia — em dados: empresas, vagas, requisitos, status, tecnologias pedidas, modalidade, cidade, links, salário aproximado e observações.

## Links

- Demo visual: https://radar-de-candidaturas-demo.vercel.app/
- Código-fonte: https://github.com/theocfischer/radar-de-candidaturas

> A demo visual usa dados fictícios e roda sem backend.  
> A versão completa do projeto usa React, Node.js, Express e MySQL.

## Por que este projeto existe

Na busca por vagas de entrada, algumas exigências mudam bastante a decisão de candidatura. Para mim, os filtros mais importantes são coisas como:

- a vaga exige graduação?
- exige CNH?
- exige inglês?
- é remota, híbrida ou presencial?
- tem salário informado?
- quais tecnologias aparecem com mais frequência?
- a vaga combina mesmo com meu momento atual?

O sistema não tenta buscar vagas automaticamente na internet. A proposta é registrar manualmente oportunidades encontradas em LinkedIn, Gupy, Indeed, grupos, sites de empresas e outros lugares, para acompanhar tudo com mais clareza.

## Stack usada

- **Frontend:** React, Vite, HTML, CSS e JavaScript
- **Backend:** Node.js e Express
- **Banco de dados:** MySQL/SQL
- **API:** rotas REST simples
- **Dados:** Python, pandas e Matplotlib
- **Ferramentas:** Git/GitHub, VS Code, XAMPP/phpMyAdmin ou MySQL local

## Funcionalidades atuais

- cadastro de empresas;
- cadastro de vagas;
- registro de status da candidatura;
- campos de salário, modalidade, cidade, senioridade e link;
- filtros por área, modelo, status, graduação, CNH, inglês e vagas mais viáveis;
- campo de aderência/compatibilidade com a vaga;
- dashboard com métricas da busca;
- listagem de tecnologias/requisitos mais citados;
- seed SQL com dados fictícios e realistas para estudo;
- script Python para exportar dados e gerar gráficos simples.

## Estrutura de pastas

```text
radar-de-candidaturas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── sql/
├── frontend/
│   └── src/
├── python_analytics/
├── data/
├── exports/
└── docs/
```

O nome da pasta e do banco ainda podem aparecer como `career_insight_hub`. Isso foi mantido para evitar mudanças internas desnecessárias. O nome público do projeto é **Radar de Candidaturas**.

## Como executar

O passo a passo completo está em:

```text
docs/tutorial_execucao.md
```

Resumo rápido:

```bash
# 1. importar o banco
mysql -u root -p < backend/sql/schema.sql
mysql -u root -p < backend/sql/seed.sql

# 2. rodar o backend
cd backend
cp .env.example .env
npm install
npm run dev

# 3. rodar o frontend em outro terminal
cd frontend
npm install
npm run dev
```

URLs principais:

```text
Backend:  http://localhost:3001
Health:   http://localhost:3001/api/health
Frontend: http://localhost:5173
```

## O que estudar primeiro neste projeto

Para entender o projeto sem se perder, eu estudaria nesta ordem:

1. **Banco de dados:** `backend/sql/schema.sql` e `backend/sql/seed.sql`.
2. **API de vagas:** `backend/src/routes/jobRoutes.js`, `backend/src/controllers/jobController.js` e `backend/src/services/jobService.js`.
3. **Dashboard:** `backend/src/services/dashboardService.js` e a tela principal em `frontend/src/App.jsx`.
4. **Componentes React:** `JobCard.jsx`, `JobForm.jsx`, `CompanyForm.jsx`, `StatCard.jsx` e `BarList.jsx`.
5. **Script Python:** `python_analytics/analyze_jobs.py`.

## Observação

Este é um projeto pessoal de estudo, feito para praticar full stack, dados e organização profissional. A ideia não é parecer uma plataforma corporativa perfeita, e sim uma aplicação realista, evolutiva e útil para a minha própria rotina de candidaturas.
