// src/Users/users.router.ts
import { Hono } from 'hono';
import { UsersController } from './users.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const usersRouter = new Hono();
usersRouter.post('/', UsersController.createUser); // POST /users


// Apply middleware to all routes
usersRouter.use('*', authMiddleware, adminMiddleware);

// Routes
usersRouter.get('/', UsersController.getAllUsers); // GET /users
usersRouter.delete('/:id', UsersController.deleteUser); // DELETE /users/:id
usersRouter.put('/:id', UsersController.updateUser); // PUT /users/:id

export default usersRouter;