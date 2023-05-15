import { Router } from 'express';

import actionsController from './actions';
const router = Router();
router.use('actions', actionsController);
export default router;
