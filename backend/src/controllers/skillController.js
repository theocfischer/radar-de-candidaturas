import * as skillService from '../services/skillService.js';

export async function index(req, res) {
  const skills = await skillService.listSkills();
  res.json(skills);
}

export async function store(req, res) {
  const skill = await skillService.createSkill(req.body);
  res.status(201).json(skill);
}

export async function attach(req, res) {
  const relation = await skillService.attachSkillToJob(
    req.params.jobId,
    req.body.skill_id,
    req.body.importance
  );
  res.status(201).json(relation);
}
