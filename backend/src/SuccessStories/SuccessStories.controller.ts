import { Context } from "hono";
import { SuccessStoriesService, uploadToCloudinary } from "./SuccessStories.services";
import { InsertSuccessStory } from "../schema";

const successStoriesService = new SuccessStoriesService();

export class SuccessStoriesController {
  static async getAllSuccessStories(c: Context) {
    const stories = await successStoriesService.getAllSuccessStories();
    return c.json(stories);
  }

  static async getSuccessStoryById(c: Context) {
    const id = Number(c.req.param("id"));
    const story = await successStoriesService.getSuccessStoryById(id);
    return story ? c.json(story) : c.json({ error: "Not found" }, 404);
  }

  static async createSuccessStory(c: Context) {
    const formData = await c.req.formData();
    const imageFile = formData.get("image") as File | null;
    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const author = formData.get("author")?.toString() || "";

    if (!title || !content || !author) {
      return c.json({ error: "Title, content and author are required" }, 400);
    }

    let imageUrl = "";
    let publicId = "";

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult: any = await uploadToCloudinary(buffer, {
        public_id: title.toLowerCase().replace(/\s+/g, "-")
      });
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const storyData: InsertSuccessStory = {
      title,
      content,
      author,
      imageUrl,
      publicId,
      publishedAt: new Date() // Set current date as publishedAt
    };

    const newStory = await successStoriesService.createSuccessStory(storyData);
    return c.json(newStory, 201);
  }

  static async updateSuccessStory(c: Context) {
    const id = Number(c.req.param("id"));
    const storyData = await c.req.json();
    const updatedStory = await successStoriesService.updateSuccessStory(id, storyData);
    return c.json(updatedStory);
  }

  static async deleteSuccessStory(c: Context) {
    const id = Number(c.req.param("id"));
    await successStoriesService.deleteSuccessStory(id);
    return c.json({ message: "Success story deleted" });
  }
}