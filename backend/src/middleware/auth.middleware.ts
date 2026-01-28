import type { Context, Next } from 'hono';
import { jwt } from 'hono/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-32-chars-long-123456';

export const jwtAuth = jwt({
  secret: JWT_SECRET,
  cookie: 'token', 
});

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    await jwtAuth(c, async () => {
      c.set('jwtPayload', c.get('jwtPayload'));
    });
    await next();
  } catch (error) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

export const adminMiddleware = async (c: Context, next: Next) => {
  const payload = c.get('jwtPayload');
  
  if (!payload) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  console.log('Admin Middleware Payload:', payload);

  if (payload.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }

  await next();
};