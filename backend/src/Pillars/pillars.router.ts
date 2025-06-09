import { Hono } from 'hono';
import {
  getAllPillars,
  uploadPillar,
  updatePillarEntry,
  removePillar
} from '../Pillars/pillars.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const pillarsRouter = new Hono();

// ✅ Public GET route (no auth required)
pillarsRouter.get('/', getAllPillars);

// 🔒 Protect the remaining routes
pillarsRouter.use('*', authMiddleware, adminMiddleware);

// ✅ Admin-only routes
pillarsRouter.post('/upload', uploadPillar);
pillarsRouter.put('/:id', updatePillarEntry);
pillarsRouter.delete('/:id', removePillar);

export default pillarsRouter;
