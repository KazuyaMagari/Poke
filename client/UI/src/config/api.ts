import { getApiBaseUrl, getFrontUrl } from './environment';

// API Configuration
export const API_CONFIG = {
  // Base URL for API calls
  BASE_URL: getApiBaseUrl(),
  
  // Frontend URL for CORS
  FRONT_URL: getFrontUrl(),
  
  // API endpoints
  ENDPOINTS: {
    QUIZ: 'quiz',
    QUIZ_IMAGE: 'quiz/image',
    LIST: 'list',
  }
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string, params?: string) => {
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/') 
    ? API_CONFIG.BASE_URL 
    : `${API_CONFIG.BASE_URL}/`;
  
  if (params) {
    return `${baseUrl}${endpoint}/${params}`;
  }
  
  return `${baseUrl}${endpoint}`;
};

// Validate API configuration
export const validateApiConfig = () => {
  if (!API_CONFIG.BASE_URL) {
    console.error('VITE_API_BASE_URL is not set. Please check your environment variables.');
    return false;
  }
  return true;
};
