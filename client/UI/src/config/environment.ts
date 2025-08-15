// Environment Configuration
// Update these values with your actual production URLs

export const ENV_CONFIG = {
  // Production Backend URL (update this with your actual backend URL)
  PROD_API_BASE_URL: 'https://poke-l5yvw54b2-kazuyamagaris-projects.vercel.app/',
  
  // Production Frontend URL (update this with your actual frontend URL)
  PROD_FRONT_URL: 'https://poke-v456.vercel.app',
  
  // Development URLs
  DEV_API_BASE_URL: 'http://localhost:3000/',
  DEV_FRONT_URL: 'http://localhost:5173',
};

// Get the appropriate configuration based on environment
export const getApiBaseUrl = () => {
  // Check if we're in production (Vercel)
  if (import.meta.env.PROD) {
    return ENV_CONFIG.PROD_API_BASE_URL;
  }
  
  // Check if environment variable is set
  if (import.meta.env.VITE_API_BASE_URL) {
    // trim spaces that may be present in .env files
    const raw = String(import.meta.env.VITE_API_BASE_URL).trim();
    // ensure trailing slash for downstream builders
    return raw.endsWith('/') ? raw : `${raw}/`;
  }
  
  // Fallback to development
  return ENV_CONFIG.DEV_API_BASE_URL;
};

export const getFrontUrl = () => {
  if (import.meta.env.PROD) {
    return ENV_CONFIG.PROD_FRONT_URL;
  }
  
  if (import.meta.env.VITE_FRONT_URL) {
    return import.meta.env.VITE_FRONT_URL;
  }
  
  return ENV_CONFIG.DEV_FRONT_URL;
};
