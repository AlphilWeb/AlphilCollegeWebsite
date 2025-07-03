"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const applications_controller_1 = require("./applications.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const applicationsRouter = new hono_1.Hono();
// Public POST route (no auth required)
applicationsRouter.post("/", applications_controller_1.ApplicationController.createApplication);
// Public GET route for downloading filled DOCX
applicationsRouter.get("/:id/download-docx", applications_controller_1.ApplicationController.generateApplicationDocx);
// Protected admin routes (require auth + admin)
applicationsRouter.use('*', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware);
applicationsRouter.get("/", applications_controller_1.ApplicationController.getAllApplications);
applicationsRouter.get("/:id", applications_controller_1.ApplicationController.getApplicationById);
applicationsRouter.put("/:id", applications_controller_1.ApplicationController.updateApplication);
applicationsRouter.delete("/:id", applications_controller_1.ApplicationController.deleteApplication);
// Debug endpoint (protected)
applicationsRouter.get('/debug', (c) => {
    const payload = c.get('jwtPayload');
    return c.json({
        message: 'Admin access granted',
        user: payload
    });
});
exports.default = applicationsRouter;
