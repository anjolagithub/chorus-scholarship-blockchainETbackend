import cloudinary from 'cloudinary';
import { config } from './app.config.js';

cloudinary.v2.config({
  cloud_name: 'diy7qqdgi',
  api_key: config.storage.database.fileStorage.cloudinary.apiKey,
  api_secret: config.storage.database.fileStorage.cloudinary.apiSecret,
  secure: true,
});

export default cloudinary;
