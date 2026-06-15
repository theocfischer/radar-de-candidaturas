import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as controller from '../controllers/dashboardController.js';

const router = Router();

router.get('/overview', asyncHandler(controller.overview));

export default router;
