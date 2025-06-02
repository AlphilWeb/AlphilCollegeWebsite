"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessStoriesService = exports.uploadToCloudinary = void 0;
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
            folder: "success_stories",
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
class SuccessStoriesService {
    async getAllSuccessStories() {
        return await db_1.default.query.SuccessStoriesTable.findMany();
    }
    async getSuccessStoryById(id) {
        return await db_1.default.query.SuccessStoriesTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.SuccessStoriesTable.id, id) });
    }
    async createSuccessStory(story) {
        const [newStory] = await db_1.default.insert(schema_1.SuccessStoriesTable).values(story).returning();
        return newStory;
    }
    async updateSuccessStory(id, storyData) {
        const [updatedStory] = await db_1.default.update(schema_1.SuccessStoriesTable).set(storyData).where((0, drizzle_orm_1.eq)(schema_1.SuccessStoriesTable.id, id)).returning();
        return updatedStory;
    }
    async deleteSuccessStory(id) {
        const story = await this.getSuccessStoryById(id);
        if (story?.publicId) {
            await cloudinary_1.v2.uploader.destroy(story.publicId);
        }
        await db_1.default.delete(schema_1.SuccessStoriesTable).where((0, drizzle_orm_1.eq)(schema_1.SuccessStoriesTable.id, id));
        return "Success Story Deleted Successfully";
    }
}
exports.SuccessStoriesService = SuccessStoriesService;
