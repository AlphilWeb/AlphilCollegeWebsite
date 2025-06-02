"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleFromCloudinary = exports.deleteGalleryItem = exports.getGalleryItems = exports.createGalleryItem = exports.uploadToCloudinary = void 0;
// src/services/gallery.service.ts
const cloudinary_1 = require("cloudinary");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
const uploadToCloudinary = async (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'gallery',
            resource_type: 'auto',
            ...options,
        }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return reject(new Error('Failed to upload image to Cloudinary'));
            }
            if (!result) {
                return reject(new Error('No result from Cloudinary'));
            }
            resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
            });
        });
        uploadStream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const createGalleryItem = async (item) => {
    try {
        const [newItem] = await db_1.default
            .insert(schema_1.GalleryTable)
            .values(item)
            .returning();
        if (!newItem) {
            throw new Error('Failed to create gallery item');
        }
        return newItem;
    }
    catch (error) {
        console.error('Error creating gallery item:', error);
        throw new Error('Failed to create gallery item in database');
    }
};
exports.createGalleryItem = createGalleryItem;
const getGalleryItems = async () => {
    try {
        return await db_1.default
            .select()
            .from(schema_1.GalleryTable)
            .orderBy(schema_1.GalleryTable.createdAt);
    }
    catch (error) {
        console.error('Error fetching gallery items:', error);
        throw new Error('Failed to fetch gallery items');
    }
};
exports.getGalleryItems = getGalleryItems;
const deleteGalleryItem = async (id) => {
    try {
        // First get the item to get the Cloudinary public_id
        const [item] = await db_1.default
            .select()
            .from(schema_1.GalleryTable)
            .where((0, drizzle_orm_1.eq)(schema_1.GalleryTable.id, id))
            .limit(1);
        if (!item) {
            throw new Error('Gallery item not found');
        }
        // Delete from Cloudinary first
        if (item.publicId) {
            await cloudinary_1.v2.uploader.destroy(item.publicId);
        }
        // Then delete from database
        await db_1.default
            .delete(schema_1.GalleryTable)
            .where((0, drizzle_orm_1.eq)(schema_1.GalleryTable.id, id));
    }
    catch (error) {
        console.error('Error deleting gallery item:', error);
        throw new Error('Failed to delete gallery item');
    }
};
exports.deleteGalleryItem = deleteGalleryItem;
const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        if (publicIds.length > 0) {
            await cloudinary_1.v2.api.delete_resources(publicIds);
        }
    }
    catch (error) {
        console.error('Error deleting multiple images from Cloudinary:', error);
        throw new Error('Failed to delete images from Cloudinary');
    }
};
exports.deleteMultipleFromCloudinary = deleteMultipleFromCloudinary;
