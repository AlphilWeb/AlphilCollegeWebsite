import { Context } from "hono";
import {
  createPillar,
  getPillars,
  updatePillar,
  deletePillar,
  uploadToCloudinary
} from "../Pillars/pillars.services";

export const getAllPillars = async (c: Context) => {
  const data = await getPillars();
  return c.json(data);
};

export const uploadPillar = async (c: Context) => {
  const formData = await c.req.formData();
  const title = formData.get('title')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  const image = formData.get('image') as File | null;

  if (!title || !description || !image) {
    return c.json({ message: 'Title, description, and image are required' }, 400);
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const { secure_url, public_id } = await uploadToCloudinary(buffer, {
    public_id: title.toLowerCase().replace(/\s+/g, '-')
  });

  const newPillar = await createPillar({
    title,
    description,
    imageUrl: secure_url,
    publicId: public_id
  });

  return c.json(newPillar, 201);
};

export const updatePillarEntry = async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ message: 'Invalid ID' }, 400);

  const body = await c.req.json();
  const updated = await updatePillar(id, body);
  return c.json(updated);
};

export const removePillar = async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ message: 'Invalid ID' }, 400);

  await deletePillar(id);
  return c.json({ success: true });
};
