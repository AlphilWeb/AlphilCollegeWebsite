"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
function isErrorWithMessage(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string');
}
function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError))
        return maybeError;
    try {
        return new Error(JSON.stringify(maybeError));
    }
    catch {
        return new Error(String(maybeError));
    }
}
class AuthController {
    static async login(c) {
        try {
            const { email, password } = await c.req.json();
            if (!email || !password) {
                return c.json({ error: 'Email and password are required' }, 400);
            }
            const result = await auth_service_1.AuthService.login(email, password);
            return c.json(result);
        }
        catch (error) {
            const errorWithMessage = toErrorWithMessage(error);
            return c.json({ error: errorWithMessage.message }, 401);
        }
    }
    static async register(c) {
        try {
            const { email, password, name } = await c.req.json();
            if (!email || !password || !name) {
                return c.json({ error: 'Email, password, and name are required' }, 400);
            }
            const result = await auth_service_1.AuthService.register(email, password, name);
            return c.json(result, 201);
        }
        catch (error) {
            const errorWithMessage = toErrorWithMessage(error);
            return c.json({ error: errorWithMessage.message }, 400);
        }
    }
    static async getCurrentUser(c) {
        const token = c.req.header('Authorization')?.replace('Bearer ', '');
        if (!token)
            return c.json({ error: 'Unauthorized' }, 401);
        const user = await auth_service_1.AuthService.getCurrentUser(token);
        return user ? c.json(user) : c.json({ error: 'User not found' }, 404);
    }
    static async refreshToken(c) {
        // dummy placeholder
        return c.json({ token: 'new-token' });
    }
    static async logout(c) {
        // no server-side logout with stateless JWT
        return c.json({ message: 'Logged out (client should discard token)' });
    }
}
exports.AuthController = AuthController;
