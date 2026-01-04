// packages/backend/src/services/video.service.js
import jwt from "jsonwebtoken";

// ---- Twilio Video token (optional) ----
import Twilio from "twilio";

const { AccessToken } = Twilio.jwt;
const { VideoGrant } = AccessToken;

/**
 * Generate Twilio Video JWT for a room and identity.
 */
export const generateTwilioVideoToken = ({ identity, roomName }) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKey = process.env.TWILIO_API_KEY;
  const apiSecret = process.env.TWILIO_API_SECRET;

  if (!accountSid || !apiKey || !apiSecret) {
    throw new Error("Missing Twilio environment variables");
  }

  const token = new AccessToken(accountSid, apiKey, apiSecret, {
    identity
  });

  const videoGrant = new VideoGrant({
    room: roomName
  });

  token.addGrant(videoGrant);

  return token.toJwt();
};

