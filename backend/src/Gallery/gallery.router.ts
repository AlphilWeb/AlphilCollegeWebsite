import { Hono } from 'hono';
// import { getAllImages, uploadImage, deleteImage, uploadMultipleImages } from '../controllers/gallery.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { getAllImages, uploadImage, uploadMultipleImages, deleteImage } from './gallery.controller';

const galleryRouter = new Hono();

// ✅ Public GET route (no auth required)
galleryRouter.get('/', getAllImages);

// 🔒 Protect the remaining routes
galleryRouter.use('*', authMiddleware, adminMiddleware);

// ✅ Admin-only routes
galleryRouter.post('/upload', uploadImage);
galleryRouter.post('/upload/bulk', uploadMultipleImages); // Add bulk upload route
galleryRouter.delete('/:id', deleteImage);

export default galleryRouter;