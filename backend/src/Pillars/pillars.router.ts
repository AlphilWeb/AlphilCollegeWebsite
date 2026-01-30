import { Hono } from 'hono';
import {
  getAllPillars,
  removePillar,
  updatePillarEntry,
  uploadPillar
} from '../Pillars/pillars.controller';
import { adminMiddleware, authMiddleware } from '../middleware/auth.middleware';

const pillarsRouter = new Hono();

pillarsRouter.get('/', getAllPillars);

pillarsRouter.use('*', authMiddleware, adminMiddleware);

pillarsRouter.post('/upload', uploadPillar);
pillarsRouter.put('/:id', updatePillarEntry);
pillarsRouter.delete('/:id', removePillar);

export default pillarsRouter;
