export default () => ({
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  LARAVEL_URL: import.meta.env.VITE_LARAVEL_URL,
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "token",
  ONESIGNAL_APP_ID: import.meta.env.VITE_ONE_SIGNAL || "6661b28a-59c8-44f2-90d1-48e8981b281d",
});
