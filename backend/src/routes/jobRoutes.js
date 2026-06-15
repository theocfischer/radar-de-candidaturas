import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as controller from '../controllers/jobController.js';

const router = Router();

router.get('/', asyncHandler(controller.index));
router.get('/:id', asyncHandler(controller.show));
router.post('/', asyncHandler(controller.store));
router.delete('/:id', asyncHandler(controller.destroy));

export default router;
