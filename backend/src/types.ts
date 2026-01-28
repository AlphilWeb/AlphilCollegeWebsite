// src/types.ts
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  publicId: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface HeroImage {
  id: number;
  title: string;
  subtitle: string | null; 
  imageUrl: string;
  publicId: string;
  createdAt?: Date | null;
}
