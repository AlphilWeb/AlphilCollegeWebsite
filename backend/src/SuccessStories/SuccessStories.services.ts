import { eq } from "drizzle-orm";
import db from "../db";
import { SuccessStoriesTable, InsertSuccessStory, SelectSuccessStory } from "../schema";
import { v2 as cloudinary } from 'cloudinary';

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
        folder: "success_stories",
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

export class SuccessStoriesService {
  async getAllSuccessStories(): Promise<SelectSuccessStory[]> {
    return await db.query.SuccessStoriesTable.findMany();
  }

  async getSuccessStoryById(id: number): Promise<SelectSuccessStory | undefined> {
    return await db.query.SuccessStoriesTable.findFirst({ where: eq(SuccessStoriesTable.id, id) });
  }

  async createSuccessStory(story: InsertSuccessStory): Promise<SelectSuccessStory> {
    const [newStory] = await db.insert(SuccessStoriesTable).values(story).returning();
    return newStory;
  }

  async updateSuccessStory(id: number, storyData: Partial<InsertSuccessStory>): Promise<SelectSuccessStory> {
    const [updatedStory] = await db.update(SuccessStoriesTable).set(storyData).where(eq(SuccessStoriesTable.id, id)).returning();
    return updatedStory;
  }

  async deleteSuccessStory(id: number) {
    const story = await this.getSuccessStoryById(id);
    if (story?.publicId) {
      await cloudinary.uploader.destroy(story.publicId);
    }
    await db.delete(SuccessStoriesTable).where(eq(SuccessStoriesTable.id, id));
    return "Success Story Deleted Successfully";
  }
}