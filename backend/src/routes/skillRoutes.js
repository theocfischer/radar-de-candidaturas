import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as controller from '../controllers/skillController.js';

const router = Router();

router.get('/', asyncHandler(controller.index));
router.post('/', asyncHandler(controller.store));
router.post('/jobs/:jobId', asyncHandler(controller.attach));

export default router;
