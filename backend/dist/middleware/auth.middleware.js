"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = exports.jwtAuth = void 0;
const jwt_1 = require("hono/jwt");
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-32-chars-long-123456';
exports.jwtAuth = (0, jwt_1.jwt)({
    secret: JWT_SECRET,
    cookie: 'token', // Optional: if using cookies
});
const authMiddleware = async (c, next) => {
    try {
        await (0, exports.jwtAuth)(c, async () => {
            // Store payload in context for downstream middleware
            c.set('jwtPayload', c.get('jwtPayload'));
        });
        await next();
    }
    catch (error) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = async (c, next) => {
    const payload = c.get('jwtPayload');
    if (!payload) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    // Debug log to verify payload
    console.log('Admin Middleware Payload:', payload);
    if (payload.role !== 'admin') {
        return c.json({ error: 'Admin access required' }, 403);
    }
    await next();
};
exports.adminMiddleware = adminMiddleware;
