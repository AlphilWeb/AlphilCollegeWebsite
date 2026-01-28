import { Context } from 'hono';
import { AuthService } from './auth.service';

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export class AuthController {
  static async login(c: Context) {
    try {
      const { email, password } = await c.req.json();
      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }
      
      const result = await AuthService.login(email, password);
      return c.json(result);
    } catch (error: unknown) {
      const errorWithMessage = toErrorWithMessage(error);
      return c.json({ error: errorWithMessage.message }, 401);
    }
  }

  static async register(c: Context) {
    try {
      const { email, password, name } = await c.req.json();
      
      if (!email || !password || !name) {
        return c.json(
          { error: 'Email, password, and name are required' }, 
          400
        );
      }

      const result = await AuthService.register(email, password, name);
      return c.json(result, 201);
    } catch (error: unknown) {
      const errorWithMessage = toErrorWithMessage(error);
      return c.json({ error: errorWithMessage.message }, 400);
    }
  }
    static async getCurrentUser(c: Context) {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return c.json({ error: 'Unauthorized' }, 401);

    const user = await AuthService.getCurrentUser(token);
    return user ? c.json(user) : c.json({ error: 'User not found' }, 404);
  }

  static async refreshToken(c: Context) {
    // dummy placeholder
    return c.json({ token: 'new-token' });
  }

  static async logout(c: Context) {
    return c.json({ message: 'Logged out (client should discard token)' });
  }
}