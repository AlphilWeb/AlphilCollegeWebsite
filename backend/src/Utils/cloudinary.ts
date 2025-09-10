// src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
}

// Single upload function (original functionality)
export const uploadToCloudinary = async (
  buffer: Buffer,
  options: Record<string, unknown> = {}
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'hero',
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

// Mass upload function for multiple photos
export const uploadMultipleToCloudinary = async (
  files: Array<{
    buffer: Buffer;
    filename?: string;
    options?: Record<string, unknown>;
  }>,
  commonOptions: Record<string, unknown> = {}
): Promise<CloudinaryUploadResult[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const individualOptions = {
        ...commonOptions,
        ...file.options,
        // Use filename if provided, otherwise generate a unique name
        public_id: file.filename ? undefined : `hero_${Date.now()}_${index}`,
      };

      return uploadToCloudinary(file.buffer, individualOptions);
    });

    // Use Promise.all to upload all files concurrently
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Mass upload error:', error);
    throw new Error('Failed to upload multiple images to Cloudinary');
  }
};

// Alternative: Sequential upload with error handling for each file
export const uploadMultipleSequential = async (
  files: Array<{
    buffer: Buffer;
    filename?: string;
    options?: Record<string, unknown>;
  }>,
  commonOptions: Record<string, unknown> = {}
): Promise<Array<CloudinaryUploadResult | { error: string }>> => {
  const results: Array<CloudinaryUploadResult | { error: string }> = [];

  for (const [index, file] of files.entries()) {
    try {
      const individualOptions = {
        ...commonOptions,
        ...file.options,
        public_id: file.filename ? undefined : `hero_${Date.now()}_${index}`,
      };

      const result = await uploadToCloudinary(file.buffer, individualOptions);
      results.push(result);
    } catch (error) {
      console.error(`Failed to upload file ${index}:`, error);
      results.push({ error: `Failed to upload file ${index}` });
    }
  }

  return results;
};
