import { v2 as cloudinary } from 'cloudinary';
import db from '../db';
import { PillarsTable, InsertPillar, SelectPillar } from '../schema';
import { eq } from 'drizzle-orm';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  options: Record<string, unknown> = {}
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'pillars',
        resource_type: 'auto',
        ...options,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(new Error('Failed to upload image to Cloudinary'));
        }
        if (!result) return reject(new Error('No result from Cloudinary'));

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
};

export const createPillar = async (data: InsertPillar): Promise<SelectPillar> => {
  const [newPillar] = await db.insert(PillarsTable).values(data).returning();
  if (!newPillar) throw new Error('Failed to create pillar');
  return newPillar;
};

export const getPillars = async (): Promise<SelectPillar[]> => {
  return await db.select().from(PillarsTable).orderBy(PillarsTable.createdAt);
};

export const updatePillar = async (
  id: number,
  updates: Partial<InsertPillar>
): Promise<SelectPillar> => {
  const [updated] = await db
    .update(PillarsTable)
    .set(updates)
    .where(eq(PillarsTable.id, id))
    .returning();

  if (!updated) throw new Error('Failed to update pillar');
  return updated;
};

export const deletePillar = async (id: number): Promise<void> => {
  const [item] = await db.select().from(PillarsTable).where(eq(PillarsTable.id, id)).limit(1);
  if (!item) throw new Error('Pillar not found');

  if (item.publicId) await cloudinary.uploader.destroy(item.publicId);
  await db.delete(PillarsTable).where(eq(PillarsTable.id, id));
};
