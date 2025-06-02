"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoriesController = void 0;
const SuccessStories_services_1 = require("./SuccessStories.services");
const successStoriesService = new SuccessStories_services_1.SuccessStoriesService();
class SuccessStoriesController {
    static async getAllSuccessStories(c) {
        const stories = await successStoriesService.getAllSuccessStories();
        return c.json(stories);
    }
    static async getSuccessStoryById(c) {
        const id = Number(c.req.param("id"));
        const story = await successStoriesService.getSuccessStoryById(id);
        return story ? c.json(story) : c.json({ error: "Not found" }, 404);
    }
    static async createSuccessStory(c) {
        const formData = await c.req.formData();
        const imageFile = formData.get("image");
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
            const uploadResult = await (0, SuccessStories_services_1.uploadToCloudinary)(buffer, {
                public_id: title.toLowerCase().replace(/\s+/g, "-")
            });
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }
        const storyData = {
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
    static async updateSuccessStory(c) {
        const id = Number(c.req.param("id"));
        const storyData = await c.req.json();
        const updatedStory = await successStoriesService.updateSuccessStory(id, storyData);
        return c.json(updatedStory);
    }
    static async deleteSuccessStory(c) {
        const id = Number(c.req.param("id"));
        await successStoriesService.deleteSuccessStory(id);
        return c.json({ message: "Success story deleted" });
    }
}
exports.SuccessStoriesController = SuccessStoriesController;
