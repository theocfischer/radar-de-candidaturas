import * as applicationService from '../services/applicationService.js';

export async function upsert(req, res) {
  const application = await applicationService.createOrUpdateApplication(req.body);
  res.status(201).json(application);
}
