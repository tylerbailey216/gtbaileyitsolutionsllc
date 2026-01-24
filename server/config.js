import dotenv from 'dotenv';

dotenv.config();

const bool = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

export const config = {
  port: Number(process.env.PORT || 3000),
  offlineOnly: bool(process.env.OFFLINE_ONLY, true),
};

export const ensureConfig = () => {
  if (!config.offlineOnly) {
    console.warn('[startup] Cloud model mode is no longer available. The chatbot will continue in offline knowledge mode.');
    config.offlineOnly = true;
  }
};
