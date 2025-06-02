"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/heroImages.router.ts
const hono_1 = require("hono");
const heroImages_controller_1 = require("../HeroImages/heroImages.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const heroImagesRouter = new hono_1.Hono();
// ✅ Public GET route
heroImagesRouter.get('/', heroImages_controller_1.getHeroImages);
// 🔒 Protected admin-only routes
heroImagesRouter.use('*', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware);
heroImagesRouter.post('/upload', heroImages_controller_1.uploadHeroImage);
heroImagesRouter.delete('/:id', heroImages_controller_1.deleteHeroImage);
exports.default = heroImagesRouter;
