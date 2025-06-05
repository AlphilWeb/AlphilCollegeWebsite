import { Hono } from 'hono';
import { getAllImages, uploadImage, deleteImage } from './gallery.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const galleryRouter = new Hono();

// ✅ Public GET route (no auth required)
galleryRouter.get('/', getAllImages);

// 🔒 Protect the remaining routes
galleryRouter.use('*', authMiddleware, adminMiddleware);

// ✅ Admin-only routes
galleryRouter.post('/upload', uploadImage);
galleryRouter.delete('/:id', deleteImage);

export default galleryRouter;
