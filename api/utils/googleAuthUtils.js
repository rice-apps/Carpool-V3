import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../config';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export const authenticateGoogleToken = async (googleIdToken) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: googleIdToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log('Google token payload:', { hd: payload.hd, email: payload.email });
    if (payload.hd !== 'rice.edu') return { success: false };
    const netid = payload.email.replace('@rice.edu', '').toLowerCase();
    return { success: true, netid };
  } catch (e) {
    console.log('Google token verification failed:', e.message);
    return { success: false };
  }
};
