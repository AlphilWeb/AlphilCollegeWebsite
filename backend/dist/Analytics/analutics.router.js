"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const analytics_controller_1 = require("../Analytics/analytics.controller");
const analyticsRouter = new hono_1.Hono();
analyticsRouter.get('/overview', analytics_controller_1.getAdminAnalytics);
exports.default = analyticsRouter;
