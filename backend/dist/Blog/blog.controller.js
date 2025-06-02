"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostsController = void 0;
const blog_services_1 = require("./blog.services");
const blogPostsService = new blog_services_1.BlogPostsService();
class BlogPostsController {
    static async getAllBlogPosts(c) {
        const posts = await blogPostsService.getAllBlogPosts();
        return c.json(posts);
    }
    static async getBlogPostById(c) {
        const id = Number(c.req.param("id"));
        const post = await blogPostsService.getBlogPostById(id);
        return post ? c.json(post) : c.json({ error: "Not found" }, 404);
    }
    static async createBlogPost(c) {
        const formData = await c.req.formData();
        const imageFile = formData.get("image");
        const title = formData.get("title")?.toString() || "";
        const content = formData.get("content")?.toString() || "";
        if (!title || !content) {
            return c.json({ error: "Title and content are required" }, 400);
        }
        let imageUrl = "";
        let publicId = "";
        if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResult = await (0, blog_services_1.uploadToCloudinary)(buffer, {
                public_id: title.toLowerCase().replace(/\s+/g, "-")
            });
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }
        const postData = {
            title,
            content,
            author_id: c.get('jwtPayload').userId, // From auth middleware
            imageUrl,
            publicId
        };
        const newPost = await blogPostsService.createBlogPost(postData);
        return c.json(newPost, 201);
    }
    static async updateBlogPost(c) {
        const id = Number(c.req.param("id"));
        const postData = await c.req.json();
        const updatedPost = await blogPostsService.updateBlogPost(id, postData);
        return c.json(updatedPost);
    }
    static async deleteBlogPost(c) {
        const id = Number(c.req.param("id"));
        await blogPostsService.deleteBlogPost(id);
        return c.json({ message: "Blog post deleted" });
    }
}
exports.BlogPostsController = BlogPostsController;
