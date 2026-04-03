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

export default {
  uploadFile,
};
