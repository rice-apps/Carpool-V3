
// Import all env vars from .env file
require('dotenv').config()

export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
export const SERVICE_URL = process.env.SERVICE_URL;
export const SECRET = process.env.SECRET;
export const PORT = process.env.PORT;

export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
