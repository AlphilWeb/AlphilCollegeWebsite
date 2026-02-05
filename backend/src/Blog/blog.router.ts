import { Hono } from "hono";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { BlogPostsController } from "./blog.controller";

const blogpostsRouter = new Hono();

blogpostsRouter.get("/", BlogPostsController.getAllBlogPosts);
blogpostsRouter.get("/:id", BlogPostsController.getBlogPostById);

blogpostsRouter.use('*', authMiddleware);
blogpostsRouter.use('*', adminMiddleware);

blogpostsRouter.post("/", BlogPostsController.createBlogPost);
blogpostsRouter.put("/:id", BlogPostsController.updateBlogPost);
blogpostsRouter.delete("/:id", BlogPostsController.deleteBlogPost);

blogpostsRouter.get('/debug/admin', (c) => {
  const payload = c.get('jwtPayload');
  return c.json({ 
    message: 'Admin blog access granted',
    user: payload  
  });
});

export default blogpostsRouter;