"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const gallery_controller_1 = require("./gallery.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const galleryRouter = new hono_1.Hono();
// ✅ Public GET route (no auth required)
galleryRouter.get('/', gallery_controller_1.getAllImages);
// 🔒 Protect the remaining routes
galleryRouter.use('*', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware);
// ✅ Admin-only routes
galleryRouter.post('/upload', gallery_controller_1.uploadImage);
galleryRouter.delete('/:id', gallery_controller_1.deleteImage);
exports.default = galleryRouter;
