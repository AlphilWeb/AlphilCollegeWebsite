"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const hono_1 = require("hono");
const logger_1 = require("hono/logger");
const cors_1 = require("hono/cors");
const node_server_1 = require("@hono/node-server");
const auth_router_1 = __importDefault(require("./middleware/auth.router"));
const auth_middleware_1 = require("./middleware/auth.middleware");
// Route imports
const applications_route_1 = __importDefault(require("./Applications/applications.route"));
const blog_router_1 = __importDefault(require("./Blog/blog.router"));
const messages_router_1 = __importDefault(require("./Messages/messages.router"));
const SuccessStories_router_1 = __importDefault(require("./SuccessStories/SuccessStories.router"));
const users_router_1 = __importDefault(require("./Users/users.router"));
const courses_router_1 = __importDefault(require("./Courses/courses.router"));
const gallery_router_1 = __importDefault(require("./Gallery/gallery.router"));
const heroImages_router_1 = __importDefault(require("./HeroImages/heroImages.router")); // New import
const pillars_router_1 = __importDefault(require("./Pillars/pillars.router")); // New import
const app = new hono_1.Hono();
// Basic middleware
app.use("*", (0, logger_1.logger)());
app.use("*", (0, cors_1.cors)());
// ======================
// Public Routes
// ======================
app.route('/auth', auth_router_1.default);
app.route('/blogposts', blog_router_1.default);
app.route('/courses', courses_router_1.default);
app.route('/success-stories', SuccessStories_router_1.default);
app.route('/hero-images', heroImages_router_1.default);
app.route('/pillars', pillars_router_1.default);
app.get('/health', (c) => c.json({ status: 'OK' }));
// Application submission (public)
const applications_controller_1 = require("./Applications/applications.controller");
app.post('/applications', applications_controller_1.ApplicationController.createApplication);
// ======================
// Protected Routes
// ======================
// Messages (authenticated only)
app.use('/messages/*', auth_middleware_1.authMiddleware);
app.route('/messages', messages_router_1.default);
// Gallery (public GET, protected POST/DELETE handled in its router)
app.route('/gallery', gallery_router_1.default);
// ======================
// Admin Routes
// ======================
app.route('/admin/applications', applications_route_1.default); // Already protected in router
app.route('/admin/users', users_router_1.default); // Already protected in router
// Hero Images and Pillars admin routes are protected in their own routers
// ======================
// Server Setup
// ======================
const port = process.env.PORT || 3000;
console.log(`🚀 Server running on http://localhost:${port}`);
(0, node_server_1.serve)({ fetch: app.fetch, port: Number(port) });
