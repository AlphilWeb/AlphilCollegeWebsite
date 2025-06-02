"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostsService = exports.uploadToCloudinary = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
const uploadToCloudinary = async (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: "blog_posts",
            resource_type: "image",
            ...options,
        }, (error, result) => {
            if (error || !result) {
                return reject(error || new Error("Cloudinary upload failed"));
            }
            resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
class BlogPostsService {
    async getAllBlogPosts() {
        return await db_1.default.query.BlogPostsTable.findMany({
            orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        });
    }
    async getBlogPostById(id) {
        return await db_1.default.query.BlogPostsTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.BlogPostsTable.id, id) });
    }
    async createBlogPost(post) {
        const [newPost] = await db_1.default.insert(schema_1.BlogPostsTable).values(post).returning();
        return newPost;
    }
    async updateBlogPost(id, postData) {
        const [updatedPost] = await db_1.default.update(schema_1.BlogPostsTable).set(postData).where((0, drizzle_orm_1.eq)(schema_1.BlogPostsTable.id, id)).returning();
        return updatedPost;
    }
    async deleteBlogPost(id) {
        const post = await this.getBlogPostById(id);
        if (post?.publicId) {
            await cloudinary_1.v2.uploader.destroy(post.publicId);
        }
        await db_1.default.delete(schema_1.BlogPostsTable).where((0, drizzle_orm_1.eq)(schema_1.BlogPostsTable.id, id));
        return "Blog Post Deleted Successfully";
    }
}
exports.BlogPostsService = BlogPostsService;
