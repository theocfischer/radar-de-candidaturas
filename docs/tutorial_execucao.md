# Tutorial de execução — Radar de Candidaturas

Este tutorial assume um ambiente parecido com Linux, VS Code, Node.js instalado via nvm, MySQL/XAMPP ou MySQL local, e Python 3.

## 1. Pré-requisitos

Tenha instalado ou disponível:

- Node.js 18 ou superior;
- npm;
- MySQL local ou XAMPP com MySQL/MariaDB ligado;
- Python 3.10 ou superior;
- VS Code;
- navegador, como Firefox.

## 2. Abrir a pasta do projeto

Depois de extrair o ZIP, abra a pasta principal no VS Code.

A estrutura esperada é parecida com:

```text
radar-de-candidaturas/
├── backend/
├── frontend/
├── python_analytics/
├── docs/
├── data/
└── exports/
```

O projeto aparece para o usuário como **Radar de Candidaturas**, mas o banco continua chamado `career_insight_hub` para evitar quebrar configuração interna.

## 3. Criar o banco de dados

### Opção A: usando phpMyAdmin/XAMPP

1. Abra o XAMPP.
2. Ligue o MySQL.
3. Acesse `http://localhost/phpmyadmin`.
4. Clique em **Importar**.
5. Importe primeiro o arquivo:

```text
backend/sql/schema.sql
```

6. Depois importe:

```text
backend/sql/seed.sql
```

O `schema.sql` cria o banco e as tabelas. O `seed.sql` coloca dados fictícios para o dashboard já aparecer preenchido.

### Opção B: usando terminal

Na pasta principal do projeto, rode:

```bash
mysql -u root -p < backend/sql/schema.sql
mysql -u root -p < backend/sql/seed.sql
```

Se seu MySQL não usa senha no usuário `root`, tente:

```bash
mysql -u root < backend/sql/schema.sql
mysql -u root < backend/sql/seed.sql
```

## 4. Configurar o backend

Entre na pasta do backend:

```bash
cd backend
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Se o comando não funcionar, crie manualmente um arquivo chamado `.env` dentro de `backend/` com este conteúdo:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=career_insight_hub
DB_PORT=3306
```

Se seu MySQL tiver senha, preencha `DB_PASSWORD`.

Instale as dependências:

```bash
npm install
```

Rode a API:

```bash
npm run dev
```

Teste no navegador:

```text
http://localhost:3001/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "project": "Radar de Candidaturas"
}
```

## 5. Rodar o frontend

Abra outro terminal, volte para a pasta principal do projeto e entre no frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Rode o Vite:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:5173
```

O frontend espera que o backend esteja rodando em:

```text
http://localhost:3001/api
```

Se quiser mudar isso, crie um arquivo `.env` dentro de `frontend/` com:

```env
VITE_API_URL=http://localhost:3001/api
```

## 6. Rodar a análise em Python

A parte Python lê a view `vw_job_overview` no MySQL, exporta um CSV e gera gráficos simples.

Volte para a pasta principal e entre em:

```bash
cd python_analytics
```

Crie um ambiente virtual, se quiser deixar organizado:

```bash
python -m venv .venv
```

Ative o ambiente:

Linux/macOS:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Rode o script:

```bash
python analyze_jobs.py
```

Os arquivos serão gerados em:

```text
exports/
```

## 7. Erros comuns

### `ECONNREFUSED` ou erro de conexão com MySQL

Confira se o MySQL está ligado no XAMPP ou no serviço local.

### `Access denied for user 'root'@'localhost'`

O usuário ou senha do MySQL está diferente do `.env`. Ajuste `DB_USER` e `DB_PASSWORD`.

### `Unknown database 'career_insight_hub'`

O banco ainda não foi criado. Importe primeiro o `schema.sql`.

### Tela branca no frontend

Confira o console do navegador e o terminal do Vite. Também confirme se o backend está rodando e se `http://localhost:3001/api/health` responde.

### Dados não aparecem no dashboard

Confira se o `seed.sql` foi importado depois do `schema.sql`.

### Porta 3001 ou 5173 ocupada

Feche outro processo usando a porta ou altere a configuração. O padrão do projeto é:

```text
Backend: 3001
Frontend: 5173
```

## 8. O que estudar nesse projeto

### Primeiro: banco

Veja `backend/sql/schema.sql`. Ele mostra as tabelas principais:

- `companies`;
- `jobs`;
- `applications`;
- `skills`;
- `job_skills`.

### Depois: backend

Comece por:

```text
backend/src/server.js
backend/src/routes/jobRoutes.js
backend/src/controllers/jobController.js
backend/src/services/jobService.js
```

Essa sequência mostra o caminho da requisição: rota → controller → service → banco.

### Depois: frontend

Comece por:

```text
frontend/src/App.jsx
frontend/src/components/JobCard.jsx
frontend/src/components/JobForm.jsx
frontend/src/services/api.js
```

Esses arquivos mostram como os dados são carregados, filtrados, cadastrados e exibidos.

### Por último: Python

Veja:

```text
python_analytics/analyze_jobs.py
```

Ele conecta no banco, lê a view SQL e gera arquivos em `exports/`.

## 9. Ideias de melhoria futura

- editar vaga já cadastrada;
- criar modal mais completo para candidatura;
- exportar CSV direto pela API;
- adicionar login simples;
- adicionar gráficos no frontend;
- registrar data de follow-up;
- registrar currículo usado em cada vaga;
- criar uma página de detalhes da vaga.
