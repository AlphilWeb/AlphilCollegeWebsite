"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroImage = exports.updateHeroImage = exports.createHeroImage = exports.getAllHeroImages = void 0;
// src/services/heroImages.service.ts
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
const getAllHeroImages = async () => {
    return await db_1.default.select().from(schema_1.HeroImagesTable).orderBy(schema_1.HeroImagesTable.createdAt);
};
exports.getAllHeroImages = getAllHeroImages;
const createHeroImage = async (data) => {
    return await db_1.default.insert(schema_1.HeroImagesTable).values(data).returning();
};
exports.createHeroImage = createHeroImage;
const updateHeroImage = async (id, data) => {
    return await db_1.default.update(schema_1.HeroImagesTable).set(data).where((0, drizzle_orm_1.eq)(schema_1.HeroImagesTable.id, id)).returning();
};
exports.updateHeroImage = updateHeroImage;
const deleteHeroImage = async (id) => {
    const [item] = await db_1.default
        .select()
        .from(schema_1.HeroImagesTable)
        .where((0, drizzle_orm_1.eq)(schema_1.HeroImagesTable.id, id))
        .limit(1);
    if (!item) {
        throw new Error('Hero image not found');
    }
    if (item.publicId) {
        await cloudinary_1.v2.uploader.destroy(item.publicId);
    }
    await db_1.default.delete(schema_1.HeroImagesTable).where((0, drizzle_orm_1.eq)(schema_1.HeroImagesTable.id, id));
};
exports.deleteHeroImage = deleteHeroImage;
