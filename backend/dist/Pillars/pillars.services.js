"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePillar = exports.updatePillar = exports.getPillars = exports.createPillar = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
const uploadToCloudinary = async (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'pillars',
            resource_type: 'auto',
            ...options,
        }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return reject(new Error('Failed to upload image to Cloudinary'));
            }
            if (!result)
                return reject(new Error('No result from Cloudinary'));
            resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
            });
        });
        uploadStream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const createPillar = async (data) => {
    const [newPillar] = await db_1.default.insert(schema_1.PillarsTable).values(data).returning();
    if (!newPillar)
        throw new Error('Failed to create pillar');
    return newPillar;
};
exports.createPillar = createPillar;
const getPillars = async () => {
    return await db_1.default.select().from(schema_1.PillarsTable).orderBy(schema_1.PillarsTable.createdAt);
};
exports.getPillars = getPillars;
const updatePillar = async (id, updates) => {
    const [updated] = await db_1.default
        .update(schema_1.PillarsTable)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(schema_1.PillarsTable.id, id))
        .returning();
    if (!updated)
        throw new Error('Failed to update pillar');
    return updated;
};
exports.updatePillar = updatePillar;
const deletePillar = async (id) => {
    const [item] = await db_1.default.select().from(schema_1.PillarsTable).where((0, drizzle_orm_1.eq)(schema_1.PillarsTable.id, id)).limit(1);
    if (!item)
        throw new Error('Pillar not found');
    if (item.publicId)
        await cloudinary_1.v2.uploader.destroy(item.publicId);
    await db_1.default.delete(schema_1.PillarsTable).where((0, drizzle_orm_1.eq)(schema_1.PillarsTable.id, id));
};
exports.deletePillar = deletePillar;
