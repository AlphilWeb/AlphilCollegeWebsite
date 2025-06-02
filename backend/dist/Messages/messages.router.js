"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const messages_controller_1 = require("./messages.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const messagesRouter = new hono_1.Hono();
// Public route (no auth required)
messagesRouter.post("/", messages_controller_1.MessagesController.createMessage);
// Protected routes (admin only)
messagesRouter.use('*', auth_middleware_1.authMiddleware);
messagesRouter.use('*', auth_middleware_1.adminMiddleware);
messagesRouter.get("/", messages_controller_1.MessagesController.getAllMessages);
messagesRouter.get("/:id", messages_controller_1.MessagesController.getMessageById);
messagesRouter.put("/:id", messages_controller_1.MessagesController.updateMessage);
messagesRouter.delete("/:id", messages_controller_1.MessagesController.deleteMessage);
// Debug endpoint
messagesRouter.get('/debug/access', (c) => {
    const payload = c.get('jwtPayload');
    return c.json({
        message: payload ? 'Admin access verified' : 'Public access',
        user: payload || null,
        endpoints: {
            public: ['POST /'],
            protected: ['GET /', 'GET /:id', 'PUT /:id', 'DELETE /:id']
        }
    });
});
exports.default = messagesRouter;
