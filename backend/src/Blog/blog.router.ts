import { Hono } from "hono";
import { BlogPostsController } from "./blog.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const blogpostsRouter = new Hono();

// Public routes (no auth required)
blogpostsRouter.get("/", BlogPostsController.getAllBlogPosts);
blogpostsRouter.get("/:id", BlogPostsController.getBlogPostById);

// Admin-protected routes
blogpostsRouter.use('*', authMiddleware);
blogpostsRouter.use('*', adminMiddleware);

blogpostsRouter.post("/", BlogPostsController.createBlogPost);
blogpostsRouter.put("/:id", BlogPostsController.updateBlogPost);
blogpostsRouter.delete("/:id", BlogPostsController.deleteBlogPost);

// Debug endpoint (admin-only)
blogpostsRouter.get('/debug/admin', (c) => {
  const payload = c.get('jwtPayload');
  return c.json({ 
    message: 'Admin blog access granted',
    user: payload  
  });
});

export default blogpostsRouter;