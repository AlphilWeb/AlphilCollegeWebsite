import { Hono } from 'hono';
import { getAdminAnalytics } from '../Analytics/analytics.controller';

const analyticsRouter = new Hono();

analyticsRouter.get('/overview', getAdminAnalytics);

export default analyticsRouter;
