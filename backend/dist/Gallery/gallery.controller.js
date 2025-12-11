"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadMultipleImages = exports.uploadImage = exports.getAllImages = void 0;
const gallery_service_1 = require("./gallery.service");
const gallery_service_2 = require("./gallery.service");
const getAllImages = async (c) => {
    const items = await (0, gallery_service_1.getGalleryItems)();
    return c.json(items);
};
exports.getAllImages = getAllImages;
const uploadImage = async (c) => {
    const formData = await c.req.formData();
    const title = formData.get('title')?.toString() || '';
    const imageFile = formData.get('image');
    if (!title || !imageFile) {
        return c.json({ message: 'Title and image are required' }, 400);
    }
    try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await (0, gallery_service_2.uploadToCloudinary)(buffer, {
            folder: 'gallery',
            public_id: title.toLowerCase().replace(/\s+/g, '-')
        });
        const newItem = await (0, gallery_service_1.createGalleryItem)({
            title,
            imageUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id
        });
        return c.json(newItem, 201);
    }
    catch (err) {
        console.error('Upload error:', err);
        return c.json({ message: 'Upload failed' }, 500);
    }
};
exports.uploadImage = uploadImage;
// Add this function for bulk uploads
const uploadMultipleImages = async (c) => {
    const formData = await c.req.formData();
    const title = formData.get('title')?.toString() || '';
    const imageFiles = formData.getAll('images');
    if (!title) {
        return c.json({ message: 'Title is required' }, 400);
    }
    if (!imageFiles || imageFiles.length === 0) {
        return c.json({ message: 'At least one image is required' }, 400);
    }
    try {
        // Process all files
        const uploadPromises = imageFiles.map(async (file, index) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            // Generate unique public_id for each image with the same title
            const uniqueId = `${Date.now()}_${index}`;
            const publicId = `${title.toLowerCase().replace(/\s+/g, '-')}_${uniqueId}`;
            return {
                buffer,
                options: {
                    folder: 'gallery',
                    public_id: publicId
                }
            };
        });
        const filesToUpload = await Promise.all(uploadPromises);
        // Upload all images to Cloudinary
        const uploadResults = await (0, gallery_service_1.uploadMultipleToCloudinary)(filesToUpload);
        // Prepare database entries - all with the same title
        const galleryItems = uploadResults.map((result) => ({
            title: title,
            imageUrl: result.secure_url,
            publicId: result.public_id
        }));
        // Insert all into database
        const newItems = await (0, gallery_service_1.createMultipleGalleryItems)(galleryItems);
        return c.json(newItems, 201);
    }
    catch (err) {
        console.error('Bulk upload error:', err);
        return c.json({ message: 'Bulk upload failed' }, 500);
    }
};
exports.uploadMultipleImages = uploadMultipleImages;
const deleteImage = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ message: 'Invalid ID' }, 400);
    }
    await (0, gallery_service_1.deleteGalleryItem)(id);
    return c.json({ success: true });
};
exports.deleteImage = deleteImage;
