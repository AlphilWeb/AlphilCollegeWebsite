"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const blog_controller_1 = require("./blog.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const blogpostsRouter = new hono_1.Hono();
// Public routes (no auth required)
blogpostsRouter.get("/", blog_controller_1.BlogPostsController.getAllBlogPosts);
blogpostsRouter.get("/:id", blog_controller_1.BlogPostsController.getBlogPostById);
// Admin-protected routes
blogpostsRouter.use('*', auth_middleware_1.authMiddleware);
blogpostsRouter.use('*', auth_middleware_1.adminMiddleware);
blogpostsRouter.post("/", blog_controller_1.BlogPostsController.createBlogPost);
blogpostsRouter.put("/:id", blog_controller_1.BlogPostsController.updateBlogPost);
blogpostsRouter.delete("/:id", blog_controller_1.BlogPostsController.deleteBlogPost);
// Debug endpoint (admin-only)
blogpostsRouter.get('/debug/admin', (c) => {
    const payload = c.get('jwtPayload');
    return c.json({
        message: 'Admin blog access granted',
        user: payload
    });
});
exports.default = blogpostsRouter;
