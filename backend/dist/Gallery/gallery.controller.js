"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = exports.getAllImages = void 0;
const gallery_service_1 = require("./gallery.service");
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
        const uploadResult = await (0, gallery_service_1.uploadToCloudinary)(buffer, {
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
const deleteImage = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ message: 'Invalid ID' }, 400);
    }
    await (0, gallery_service_1.deleteGalleryItem)(id);
    return c.json({ success: true });
};
exports.deleteImage = deleteImage;
