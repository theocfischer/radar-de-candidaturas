import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as controller from '../controllers/applicationController.js';

const router = Router();

router.post('/', asyncHandler(controller.upsert));

export default router;
