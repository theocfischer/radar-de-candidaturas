import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as controller from '../controllers/companyController.js';

const router = Router();

router.get('/', asyncHandler(controller.index));
router.post('/', asyncHandler(controller.store));
router.delete('/:id', asyncHandler(controller.destroy));

export default router;
