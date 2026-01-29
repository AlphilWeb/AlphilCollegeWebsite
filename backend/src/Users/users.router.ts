// src/Users/users.router.ts
import { Hono } from 'hono';
import { adminMiddleware, authMiddleware } from '../middleware/auth.middleware';
import { UsersController } from './users.controller';

const usersRouter = new Hono();
usersRouter.post('/', UsersController.createUser); 


// Apply middleware to all routes
usersRouter.use('*', authMiddleware, adminMiddleware);

// Routes
usersRouter.get('/', UsersController.getAllUsers); 
usersRouter.delete('/:id', UsersController.deleteUser);
usersRouter.put('/:id', UsersController.updateUser); 

export default usersRouter;