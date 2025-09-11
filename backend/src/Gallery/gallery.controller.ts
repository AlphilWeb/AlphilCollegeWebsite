// src/controllers/gallery.controller.ts
import { Context } from "hono";
import { 
  createGalleryItem, 
  getGalleryItems, 
  deleteGalleryItem, 
  uploadMultipleToCloudinary,
  createMultipleGalleryItems
} from "./gallery.service";
import { GalleryItem, CloudinaryUploadResult } from "../types";
import { uploadToCloudinary } from "./gallery.service";

export const getAllImages = async (c: Context) => {
  const items: GalleryItem[] = await getGalleryItems();
  return c.json(items);
};

export const uploadImage = async (c: Context): Promise<Response> => {
  const formData = await c.req.formData();
  const title = formData.get('title')?.toString() || '';
  const imageFile = formData.get('image') as File | null;

  if (!title || !imageFile) {
    return c.json({ message: 'Title and image are required' }, 400);
  }

  try {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: CloudinaryUploadResult = await uploadToCloudinary(buffer, {
      folder: 'gallery',
      public_id: title.toLowerCase().replace(/\s+/g, '-')
    });

    const newItem: GalleryItem = await createGalleryItem({
      title,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id
    });

    return c.json(newItem, 201);
  } catch (err) {
    console.error('Upload error:', err);
    return c.json({ message: 'Upload failed' }, 500);
  }
};

// Add this function for bulk uploads
export const uploadMultipleImages = async (c: Context): Promise<Response> => {
  const formData = await c.req.formData();
  const title = formData.get('title')?.toString() || '';
  const imageFiles = formData.getAll('images') as File[];

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
    const uploadResults = await uploadMultipleToCloudinary(filesToUpload);

    // Prepare database entries - all with the same title
    const galleryItems = uploadResults.map((result) => ({
      title: title,
      imageUrl: result.secure_url,
      publicId: result.public_id
    }));

    // Insert all into database
    const newItems = await createMultipleGalleryItems(galleryItems);

    return c.json(newItems, 201);
  } catch (err) {
    console.error('Bulk upload error:', err);
    return c.json({ message: 'Bulk upload failed' }, 500);
  }
};

export const deleteImage = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ message: 'Invalid ID' }, 400);
  }
  
  await deleteGalleryItem(id);
  return c.json({ success: true });
};