import { eq } from "drizzle-orm";
import db from "../db";
import { BlogPostsTable, InsertBlogPost, SelectBlogPost } from "../schema";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (buffer: Buffer, options: Record<string, unknown> = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blog_posts",
        resource_type: "image",
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export class BlogPostsService {
  async getAllBlogPosts(): Promise<SelectBlogPost[]> {
    return await db.query.BlogPostsTable.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }

  async getBlogPostById(id: number): Promise<SelectBlogPost | undefined> {
    return await db.query.BlogPostsTable.findFirst({
      where: eq(BlogPostsTable.id, id),
    });
  }

  async createBlogPost(post: InsertBlogPost): Promise<SelectBlogPost> {
    const [newPost] = await db.insert(BlogPostsTable).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, postData: Partial<InsertBlogPost>): Promise<SelectBlogPost> {
    const [updatedPost] = await db.update(BlogPostsTable).set(postData).where(eq(BlogPostsTable.id, id)).returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number) {
    const post = await this.getBlogPostById(id);
    if (post?.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }
    await db.delete(BlogPostsTable).where(eq(BlogPostsTable.id, id));
    return "Blog Post Deleted Successfully";
  }
}
