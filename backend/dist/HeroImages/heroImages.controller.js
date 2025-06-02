"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroImage = exports.uploadHeroImage = exports.getHeroImages = void 0;
const heroImages_services_1 = require("../HeroImages/heroImages.services");
const cloudinary_1 = require("../Utils/cloudinary");
const getHeroImages = async (c) => {
    const items = await (0, heroImages_services_1.getAllHeroImages)();
    const normalized = items.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle ?? null, // ← this line fixed
        imageUrl: item.imageUrl,
        publicId: item.publicId,
        createdAt: item.createdAt ?? null,
    }));
    return c.json(normalized);
};
exports.getHeroImages = getHeroImages;
const uploadHeroImage = async (c) => {
    const formData = await c.req.formData();
    const title = formData.get('title')?.toString() || '';
    const subtitle = formData.get('subtitle')?.toString() || '';
    const imageFile = formData.get('image');
    if (!title || !imageFile) {
        return c.json({ message: 'Title and image are required' }, 400);
    }
    try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(buffer, {
            folder: 'hero',
            public_id: title.toLowerCase().replace(/\s+/g, '-'),
        });
        const newItem = await (0, heroImages_services_1.createHeroImage)({
            title,
            subtitle: subtitle || undefined,
            imageUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        });
        return c.json(newItem[0], 201);
    }
    catch (err) {
        console.error('Upload error:', err);
        return c.json({ message: 'Upload failed' }, 500);
    }
};
exports.uploadHeroImage = uploadHeroImage;
const deleteHeroImage = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
        return c.json({ message: 'Invalid ID' }, 400);
    }
    try {
        await (0, heroImages_services_1.deleteHeroImage)(id);
        return c.json({ success: true });
    }
    catch (err) {
        console.error('Delete error:', err);
        return c.json({ message: 'Failed to delete hero image' }, 500);
    }
};
exports.deleteHeroImage = deleteHeroImage;
