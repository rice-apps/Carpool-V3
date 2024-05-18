import axios from 'axios';
import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_TOKEN } from '../config.js';
/*
 * Module that defines some useful utility functions for handling direct creator uploads with cloudflare images.
 * The user can request an upload through us, and then we can give an upload URL to the user. After the upload url is successfully used, we then 
 * need to update the user's profile picture in our database.
 */
const generateUploadURL = async (user) => {
    const cloudflareURL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`;
    // POST request to cloudflareURL and extract uploadURL from it
    let resp = await axios.post(cloudflareURL, {
        headers: {
            'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
        }
    });

    // Return the upload URL
    return resp?.data?.uploadURL;
}

const isUploaded = async (pfpId) => {
    const cloudflareURL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1/${pfpId}`;
    // POST request to cloudflareURL and extract uploadURL from it
    let resp = await axios.post(cloudflareURL, {
        headers: {
            'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
        }
    });

    return (resp?.data?.result?.draft === false);
}
