
// Import all env vars from .env file
require('dotenv').config()

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
export const SERVICE_URL = process.env.SERVICE_URL;
export const SECRET = process.env.SECRET;
export const PORT = process.env.PORT;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_USERNAME = process.env.REDIS_USERNAME;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;