import { Hono } from 'hono';
// import { getAllImages, uploadImage, deleteImage, uploadMultipleImages } from '../controllers/gallery.controller';
import { adminMiddleware, authMiddleware } from '../middleware/auth.middleware';
import { deleteImage, getAllImages, uploadImage, uploadMultipleImages } from './gallery.controller';

const galleryRouter = new Hono();

galleryRouter.get('/', getAllImages);

galleryRouter.use('*', authMiddleware, adminMiddleware);

galleryRouter.post('/upload', uploadImage);
galleryRouter.post('/upload/bulk', uploadMultipleImages); 
galleryRouter.delete('/:id', deleteImage);

export default galleryRouter;