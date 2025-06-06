// src/services/heroImages.service.ts
import db from '../db';
import { HeroImagesTable } from '../schema';
import { eq } from 'drizzle-orm';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export const getAllHeroImages = async () => {
  return await db.select().from(HeroImagesTable).orderBy(HeroImagesTable.createdAt);
};

export const createHeroImage = async (data: {
  title: string;
  subtitle?: string;
  imageUrl: string;
  publicId: string;
}) => {
  return await db.insert(HeroImagesTable).values(data).returning();
};

export const updateHeroImage = async (
  id: number,
  data: Partial<{
    title: string;
    subtitle?: string;
    imageUrl: string;
    publicId: string;
  }>
) => {
  return await db.update(HeroImagesTable).set(data).where(eq(HeroImagesTable.id, id)).returning();
};

export const deleteHeroImage = async (id: number) => {
  const [item] = await db
    .select()
    .from(HeroImagesTable)
    .where(eq(HeroImagesTable.id, id))
    .limit(1);

  if (!item) {
    throw new Error('Hero image not found');
  }

  if (item.publicId) {
    await cloudinary.uploader.destroy(item.publicId);
  }

  await db.delete(HeroImagesTable).where(eq(HeroImagesTable.id, id));
};
