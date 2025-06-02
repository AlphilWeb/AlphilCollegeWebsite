"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePillar = exports.updatePillarEntry = exports.uploadPillar = exports.getAllPillars = void 0;
const pillars_services_1 = require("../Pillars/pillars.services");
const getAllPillars = async (c) => {
    const data = await (0, pillars_services_1.getPillars)();
    return c.json(data);
};
exports.getAllPillars = getAllPillars;
const uploadPillar = async (c) => {
    const formData = await c.req.formData();
    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const image = formData.get('image');
    if (!title || !description || !image) {
        return c.json({ message: 'Title, description, and image are required' }, 400);
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    const { secure_url, public_id } = await (0, pillars_services_1.uploadToCloudinary)(buffer, {
        public_id: title.toLowerCase().replace(/\s+/g, '-')
    });
    const newPillar = await (0, pillars_services_1.createPillar)({
        title,
        description,
        imageUrl: secure_url,
        publicId: public_id
    });
    return c.json(newPillar, 201);
};
exports.uploadPillar = uploadPillar;
const updatePillarEntry = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id))
        return c.json({ message: 'Invalid ID' }, 400);
    const body = await c.req.json();
    const updated = await (0, pillars_services_1.updatePillar)(id, body);
    return c.json(updated);
};
exports.updatePillarEntry = updatePillarEntry;
const removePillar = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id))
        return c.json({ message: 'Invalid ID' }, 400);
    await (0, pillars_services_1.deletePillar)(id);
    return c.json({ success: true });
};
exports.removePillar = removePillar;
