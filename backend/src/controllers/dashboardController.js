import * as dashboardService from '../services/dashboardService.js';

export async function overview(req, res) {
  const stats = await dashboardService.getDashboardStats();
  res.json(stats);
}
