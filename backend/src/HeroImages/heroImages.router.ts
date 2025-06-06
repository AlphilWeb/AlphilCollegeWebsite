// src/routes/heroImages.router.ts
import { Hono } from 'hono';
import { getHeroImages, uploadHeroImage, deleteHeroImage } from '../HeroImages/heroImages.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const heroImagesRouter = new Hono();

// ✅ Public GET route
heroImagesRouter.get('/', getHeroImages);

// 🔒 Protected admin-only routes
heroImagesRouter.use('*', authMiddleware, adminMiddleware);

heroImagesRouter.post('/upload', uploadHeroImage);
heroImagesRouter.delete('/:id', deleteHeroImage);

export default heroImagesRouter;
