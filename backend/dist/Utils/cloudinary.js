"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleSequential = exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = void 0;
// src/utils/cloudinary.ts
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
// Single upload function (original functionality)
const uploadToCloudinary = async (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'hero',
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
// Mass upload function for multiple photos
const uploadMultipleToCloudinary = async (files, commonOptions = {}) => {
    try {
        const uploadPromises = files.map((file, index) => {
            const individualOptions = {
                ...commonOptions,
                ...file.options,
                // Use filename if provided, otherwise generate a unique name
                public_id: file.filename ? undefined : `hero_${Date.now()}_${index}`,
            };
            return (0, exports.uploadToCloudinary)(file.buffer, individualOptions);
        });
        // Use Promise.all to upload all files concurrently
        const results = await Promise.all(uploadPromises);
        return results;
    }
    catch (error) {
        console.error('Mass upload error:', error);
        throw new Error('Failed to upload multiple images to Cloudinary');
    }
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
// Alternative: Sequential upload with error handling for each file
const uploadMultipleSequential = async (files, commonOptions = {}) => {
    const results = [];
    for (const [index, file] of files.entries()) {
        try {
            const individualOptions = {
                ...commonOptions,
                ...file.options,
                public_id: file.filename ? undefined : `hero_${Date.now()}_${index}`,
            };
            const result = await (0, exports.uploadToCloudinary)(file.buffer, individualOptions);
            results.push(result);
        }
        catch (error) {
            console.error(`Failed to upload file ${index}:`, error);
            results.push({ error: `Failed to upload file ${index}` });
        }
    }
    return results;
};
exports.uploadMultipleSequential = uploadMultipleSequential;
