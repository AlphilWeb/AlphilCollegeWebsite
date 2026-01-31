// src/routes/heroImages.router.ts
import { Hono } from 'hono';
import { deleteHeroImage, getHeroImages, uploadHeroImage } from '../HeroImages/heroImages.controller';
import { adminMiddleware, authMiddleware } from '../middleware/auth.middleware';

const heroImagesRouter = new Hono();

heroImagesRouter.get('/', getHeroImages);

heroImagesRouter.use('*', authMiddleware, adminMiddleware);

heroImagesRouter.post('/upload', uploadHeroImage);
heroImagesRouter.delete('/:id', deleteHeroImage);

export default heroImagesRouter;
