"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const pillars_controller_1 = require("../Pillars/pillars.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pillarsRouter = new hono_1.Hono();
// ✅ Public GET route (no auth required)
pillarsRouter.get('/', pillars_controller_1.getAllPillars);
// 🔒 Protect the remaining routes
pillarsRouter.use('*', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware);
// ✅ Admin-only routes
pillarsRouter.post('/upload', pillars_controller_1.uploadPillar);
pillarsRouter.put('/:id', pillars_controller_1.updatePillarEntry);
pillarsRouter.delete('/:id', pillars_controller_1.removePillar);
exports.default = pillarsRouter;
