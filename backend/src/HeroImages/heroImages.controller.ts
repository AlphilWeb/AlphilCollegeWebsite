// src/controllers/heroImages.controller.ts
import { Context } from 'hono';
import {
  createHeroImage,
  deleteHeroImage as deleteHeroImageService,
  getAllHeroImages,
} from '../HeroImages/heroImages.services';
import { uploadToCloudinary } from '../Utils/cloudinary';
import { CloudinaryUploadResult, HeroImage } from '../types';

export const getHeroImages = async (c: Context) => {
  const items = await getAllHeroImages();
  const normalized: HeroImage[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle ?? null,
    imageUrl: item.imageUrl,
    publicId: item.publicId,
    createdAt: item.createdAt ?? null,
  }));

  return c.json(normalized);
};


export const uploadHeroImage = async (c: Context): Promise<Response> => {
  const formData = await c.req.formData();
  const title = formData.get('title')?.toString() || '';
  const subtitle = formData.get('subtitle')?.toString() || '';
  const imageFile = formData.get('image') as File | null;

  if (!title || !imageFile) {
    return c.json({ message: 'Title and image are required' }, 400);
  }

  try {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: CloudinaryUploadResult = await uploadToCloudinary(buffer, {
      folder: 'hero',
      public_id: title.toLowerCase().replace(/\s+/g, '-'),
    });

    const newItem = await createHeroImage({
      title,
      subtitle: subtitle || undefined,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    return c.json(newItem[0], 201);
  } catch (err) {
    console.error('Upload error:', err);
    return c.json({ message: 'Upload failed' }, 500);
  }
};

export const deleteHeroImage = async (c: Context): Promise<Response> => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) {
    return c.json({ message: 'Invalid ID' }, 400);
  }

  try {
    await deleteHeroImageService(id);
    return c.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    return c.json({ message: 'Failed to delete hero image' }, 500);
  }
};
