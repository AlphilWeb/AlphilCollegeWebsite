import { Hono } from "hono";
import { MessagesController } from "./messages.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const messagesRouter = new Hono();

// Public route (no auth required)
messagesRouter.post("/", MessagesController.createMessage);

// Protected routes (admin only)
messagesRouter.use('*', authMiddleware);
messagesRouter.use('*', adminMiddleware);

messagesRouter.get("/", MessagesController.getAllMessages);
messagesRouter.get("/:id", MessagesController.getMessageById);
messagesRouter.put("/:id", MessagesController.updateMessage);
messagesRouter.delete("/:id", MessagesController.deleteMessage);

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

export default messagesRouter;