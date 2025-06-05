// src/controllers/gallery.controller.ts
import { Context } from "hono";
import { 
  createGalleryItem, 
  getGalleryItems, 
  deleteGalleryItem, 
  uploadToCloudinary 
} from "./gallery.service";
import { GalleryItem, CloudinaryUploadResult } from "../types"; // Import the types

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

export const deleteImage = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ message: 'Invalid ID' }, 400);
  }
  
  await deleteGalleryItem(id);
  return c.json({ success: true });
};