import { Hono } from "hono";
import { ApplicationController } from "./applications.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const applicationsRouter = new Hono();

// Public POST route (no auth required)
applicationsRouter.post("/", ApplicationController.createApplication);

// Protected admin routes (require auth + admin)
applicationsRouter.use('*', authMiddleware, adminMiddleware);
applicationsRouter.get("/", ApplicationController.getAllApplications);
applicationsRouter.get("/:id", ApplicationController.getApplicationById);
applicationsRouter.put("/:id", ApplicationController.updateApplication);
applicationsRouter.delete("/:id", ApplicationController.deleteApplication);

// Debug endpoint (protected)
applicationsRouter.get('/debug', (c) => {
  const payload = c.get('jwtPayload');
  return c.json({ 
    message: 'Admin access granted',
    user: payload 
  });
});

export default applicationsRouter;