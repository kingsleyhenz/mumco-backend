import { v2 as cloudinary } from 'cloudinary';
import { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import config from '../../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadFile = (file: Express.Multer.File, folder?: string) =>
  new Promise<UploadApiResponse>((resolve, reject) => {
    const options: UploadApiOptions = {
      folder: folder || config.cloudinary.folder,
      resource_type: 'auto',
    };

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error || !result) {
        reject(error || new Error('cloudinary upload failed'));
        return;
      }

      resolve(result);
    });

    uploadStream.end(file.buffer);
  });

/**
 * Extracts the Cloudinary public_id from a secure URL.
 * e.g. https://res.cloudinary.com/<cloud>/image/upload/v123/folder/filename.jpg
 *   => folder/filename
 */
const extractPublicId = (url: string): string => {
  // Remove query params if any
  const cleanUrl = url.split('?')[0];
  // Match everything after /upload/v<version>/ or /upload/
  const match = cleanUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return '';
  // Strip file extension
  return match[1].replace(/\.[^/.]+$/, '');
};

/**
 * Deletes a list of Cloudinary assets by their secure URLs.
 * Handles both images and videos in separate batch calls.
 */
const deleteFiles = async (
  imageUrls: string[] = [],
  videoUrls: string[] = [],
): Promise<void> => {
  const imagePublicIds = imageUrls.map(extractPublicId).filter(Boolean);
  const videoPublicIds = videoUrls.map(extractPublicId).filter(Boolean);

  const tasks: Promise<unknown>[] = [];

  if (imagePublicIds.length > 0) {
    tasks.push(cloudinary.api.delete_resources(imagePublicIds, { resource_type: 'image' }));
  }

  if (videoPublicIds.length > 0) {
    tasks.push(cloudinary.api.delete_resources(videoPublicIds, { resource_type: 'video' }));
  }

  await Promise.all(tasks);
};

export default {
  uploadFile,
  deleteFiles,
};
