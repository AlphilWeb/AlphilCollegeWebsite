import { Hono } from 'hono';
import { AuthController } from './auth.controller';

const authRouter = new Hono();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.get('/me', AuthController.getCurrentUser);
authRouter.post('/refresh', AuthController.refreshToken);
authRouter.post('/logout', AuthController.logout);

export default authRouter;