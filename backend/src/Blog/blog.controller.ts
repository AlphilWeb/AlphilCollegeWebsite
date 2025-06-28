import { Context } from "hono";
import { BlogPostsService, uploadToCloudinary } from "./blog.services";
import { InsertBlogPost } from "../schema";

const blogPostsService = new BlogPostsService();

export class BlogPostsController {
  static async getAllBlogPosts(c: Context) {
    const posts = await blogPostsService.getAllBlogPosts();
    return c.json(posts);
  }

  static async getBlogPostById(c: Context) {
    const id = Number(c.req.param("id"));
    const post = await blogPostsService.getBlogPostById(id);
    return post ? c.json(post) : c.json({ error: "Not found" }, 404);
  }

  static async createBlogPost(c: Context) {
    const formData = await c.req.formData();
    const imageFile = formData.get("image") as File | null;
    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const author = formData.get("author")?.toString() || "Unknown"; // No user relation, just a text field

    if (!title || !content) {
      return c.json({ error: "Title and content are required" }, 400);
    }

    let imageUrl = "";
    let publicId = "";

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult: any = await uploadToCloudinary(buffer, {
        public_id: title.toLowerCase().replace(/\s+/g, "-"),
      });
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const postData: InsertBlogPost = {
      title,
      content,
      author,
      imageUrl,
      publicId,
    };

    const newPost = await blogPostsService.createBlogPost(postData);
    return c.json(newPost, 201);
  }

  static async updateBlogPost(c: Context) {
    const id = Number(c.req.param("id"));
    const postData = await c.req.json();
    const updatedPost = await blogPostsService.updateBlogPost(id, postData);
    return c.json(updatedPost);
  }

  static async deleteBlogPost(c: Context) {
    const id = Number(c.req.param("id"));
    await blogPostsService.deleteBlogPost(id);
    return c.json({ message: "Blog post deleted" });
  }
}
export default BlogPostsController;