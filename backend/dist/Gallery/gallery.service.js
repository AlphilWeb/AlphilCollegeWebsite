"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleFromCloudinary = exports.deleteGalleryItem = exports.getGalleryItems = exports.createMultipleGalleryItems = exports.createGalleryItem = exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = void 0;
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
// Add this function for mass uploads
const uploadMultipleToCloudinary = async (files, commonOptions = {}) => {
    try {
        const uploadPromises = files.map((file, index) => {
            const individualOptions = {
                ...commonOptions,
                ...file.options,
                public_id: file.filename ? undefined : `gallery_${Date.now()}_${index}`,
            };
            return (0, exports.uploadToCloudinary)(file.buffer, individualOptions);
        });
        const results = await Promise.all(uploadPromises);
        return results;
    }
    catch (error) {
        console.error('Mass upload error:', error);
        throw new Error('Failed to upload multiple images to Cloudinary');
    }
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
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
// Add this function for bulk database insertion
const createMultipleGalleryItems = async (items) => {
    try {
        const newItems = await db_1.default
            .insert(schema_1.GalleryTable)
            .values(items)
            .returning();
        if (!newItems || newItems.length === 0) {
            throw new Error('Failed to create gallery items');
        }
        return newItems;
    }
    catch (error) {
        console.error('Error creating multiple gallery items:', error);
        throw new Error('Failed to create gallery items in database');
    }
};
exports.createMultipleGalleryItems = createMultipleGalleryItems;
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
