// src/services/gallery.service.ts
import { v2 as cloudinary } from 'cloudinary';
import db from '../db';
import { GalleryTable, InsertGallery, SelectGallery } from '../schema';
import { eq } from 'drizzle-orm';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  options: Record<string, unknown> = {}
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'gallery',
        resource_type: 'auto',
        ...options,
      },
      (error, result) => {
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
      }
    );
    uploadStream.end(buffer);
  });
};

export const createGalleryItem = async (
  item: InsertGallery
): Promise<SelectGallery> => {
  try {
    const [newItem] = await db
      .insert(GalleryTable)
      .values(item)
      .returning();
    
    if (!newItem) {
      throw new Error('Failed to create gallery item');
    }

    return newItem;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw new Error('Failed to create gallery item in database');
  }
};

export const getGalleryItems = async (): Promise<SelectGallery[]> => {
  try {
    return await db
      .select()
      .from(GalleryTable)
      .orderBy(GalleryTable.createdAt);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    throw new Error('Failed to fetch gallery items');
  }
};

export const deleteGalleryItem = async (id: number): Promise<void> => {
  try {
    // First get the item to get the Cloudinary public_id
    const [item] = await db
      .select()
      .from(GalleryTable)
      .where(eq(GalleryTable.id, id))
      .limit(1);

    if (!item) {
      throw new Error('Gallery item not found');
    }

    // Delete from Cloudinary first
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }

    // Then delete from database
    await db
      .delete(GalleryTable)
      .where(eq(GalleryTable.id, id));
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw new Error('Failed to delete gallery item');
  }
};

export const deleteMultipleFromCloudinary = async (
  publicIds: string[]
): Promise<void> => {
  try {
    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }
  } catch (error) {
    console.error('Error deleting multiple images from Cloudinary:', error);
    throw new Error('Failed to delete images from Cloudinary');
  }
};