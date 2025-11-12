export default () => ({
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  LARAVEL_URL: import.meta.env.VITE_LARAVEL_URL,
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY,
  // ONESIGNAL_APP_ID: import.meta.env.VITE_ONESIGNAL_APP_ID || "6661b28a-59c8-44f2-90d1-48e8981b281d",
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    VAPID_KEY: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    PRIVATE_KEY: import.meta.env.VITE_FIREBASE_PRIVATE_KEY,
  },
});
