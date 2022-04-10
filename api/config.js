
// Import all env vars from .env file
require('dotenv').config()
const cloudinary=require("cloudinary").v2;

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
export const SERVICE_URL = process.env.SERVICE_URL;
export const SECRET = process.env.SECRET;
export const PORT = process.env.PORT;

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;

const cloudinaryConfig = cloudinary.config({
  //define the cloudinary url
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

exports.cloudinaryConfig = cloudinaryConfig;