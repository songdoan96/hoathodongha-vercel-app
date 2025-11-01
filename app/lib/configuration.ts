export default () => ({
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  LARAVEL_URL: import.meta.env.VITE_LARAVEL_URL,
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "token",
  ONESIGNAL_ID: import.meta.env.VITE_ONESIGNAL_ID || "c073610c-d2e7-4dcd-9167-f5edfa8eb279",
});
