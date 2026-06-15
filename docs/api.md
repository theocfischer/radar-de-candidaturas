# API REST — Radar de Candidaturas

Base URL local:

```text
http://localhost:3001/api
```

## Health check

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok",
  "project": "Radar de Candidaturas"
}
```

## Empresas

```http
GET /companies
POST /companies
DELETE /companies/:id
```

Exemplo de body para criar empresa:

```json
{
  "name": "Nuvem Sul Sistemas",
  "sector": "Software / SaaS",
  "website": "https://example.com/nuvem-sul",
  "city": "Porto Alegre"
}
```

## Vagas

```http
GET /jobs
GET /jobs/:id
POST /jobs
DELETE /jobs/:id
```

Filtros aceitos em `GET /jobs`:

```text
?area=Dados
?work_model=Remoto
?status=Salva
?search=python
?requires_degree=false
?requires_driver_license=false
?english_required=false
?only_viable=true
```

Exemplo combinando filtros:

```text
/jobs?area=Suporte%20de%20Sistemas&requires_driver_license=false&only_viable=true
```

Exemplo de body para criar vaga:

```json
{
  "company_id": 1,
  "title": "Suporte de Sistemas Júnior",
  "area": "Suporte de Sistemas",
  "work_model": "Híbrido",
  "location": "Porto Alegre",
  "salary_min": 2200,
  "salary_max": 3000,
  "requires_degree": false,
  "requires_driver_license": false,
  "english_required": false,
  "fit_score": 82,
  "seniority": "Júnior",
  "job_url": "https://example.com/vaga-suporte-sistemas-jr",
  "notes": "Boa vaga para usar SQL básico, atendimento técnico e noções de API."
}
```

Campos importantes da vaga:

- `requires_degree`: marca se exige graduação;
- `requires_driver_license`: marca se exige CNH;
- `english_required`: marca se exige inglês;
- `fit_score`: aderência estimada de 0 a 100;
- `salary_min` e `salary_max`: faixa salarial quando a vaga informar.

## Candidaturas

```http
POST /applications
```

Cria ou atualiza o status de candidatura de uma vaga.

Exemplo:

```json
{
  "job_id": 1,
  "status": "Candidatura enviada",
  "applied_at": "2026-06-01",
  "source": "LinkedIn",
  "custom_resume": "Suporte/Sistemas",
  "next_step": "Aguardar retorno",
  "rejection_reason": null,
  "notes": "Currículo enviado com foco em SQL e suporte."
}
```

Status aceitos:

```text
Salva
Candidatura enviada
Teste
Entrevista
Negativa
Oferta
Arquivada
```

## Skills

```http
GET /skills
POST /skills
POST /skills/jobs/:jobId
```

Exemplo para vincular uma skill a uma vaga:

```json
{
  "skill_id": 3,
  "importance": "Obrigatório"
}
```

## Dashboard

```http
GET /dashboard/overview
```

Retorna dados para a tela inicial, como:

- total de vagas;
- candidaturas enviadas;
- entrevistas;
- rejeições;
- vagas que exigem graduação;
- vagas que exigem CNH;
- vagas que exigem inglês;
- vagas remotas;
- vagas mais viáveis para tentar;
- aderência média;
- distribuição por status, área, modelo e tecnologias.
