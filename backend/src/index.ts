// src/index.ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRouter from './middleware/auth.router';
// import { authMiddleware, adminMiddleware } from './middleware/auth.middleware';


// Route imports
import analyticsRouter from "./Analytics/analutics.router";
import applicationsRouter from "./Applications/applications.route";
import blogpostsRouter from "./Blog/blog.router";
import coursesRouter from "./Courses/courses.router";
import galleryRouter from "./Gallery/gallery.router";
import heroImagesRouter from "./HeroImages/heroImages.router";
import messagesRouter from "./Messages/messages.router";
import pillarsRouter from "./Pillars/pillars.router";
import successStoriesRouter from "./SuccessStories/SuccessStories.router";
import usersRouter from "./Users/users.router";

const app = new Hono();

// Basic middleware
app.use("*", logger());
app.use('*', cors({
  origin: ['https://alphil-college-website.vercel.app/', 'https://alphilcollege.co.ke'], // Add your actual frontend URLs
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))
// ======================
// Public Routes
// ======================
app.route('/auth', authRouter);
app.route('/blogposts', blogpostsRouter);
app.route('/courses', coursesRouter);
app.route('/success-stories', successStoriesRouter);
app.route('/hero-images', heroImagesRouter);
app.route('/pillars', pillarsRouter);
app.get('/health', (c) => c.json({ status: 'OK' }));
app.route('/analytics', analyticsRouter);


// Application submission (public)
import { ApplicationController } from "./Applications/applications.controller";
app.post('/applications', ApplicationController.createApplication);

// ======================
// Protected Routes
// ======================
// Messages (authenticated only)
// app.use('/messages/*', authMiddleware);
app.route('/messages', messagesRouter);

// Gallery (public GET, protected POST/DELETE handled in its router)
app.route('/gallery', galleryRouter);

// ======================
// Admin Routes
// ======================
app.route('/applications', applicationsRouter); // Already protected in router
app.route('/admin/applications', applicationsRouter); // Admin access for management
app.route('/admin/users', usersRouter); // Already protected in router
// Hero Images and Pillars admin routes are protected in their own routers

// ======================
// Server Setup
// ======================
const port = process.env.PORT || 3000;
console.log(`🚀 Server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port: Number(port) });

export default app
