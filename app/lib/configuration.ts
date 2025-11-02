export default () => ({
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  LARAVEL_URL: import.meta.env.VITE_LARAVEL_URL,
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "token",
  ONESIGNAL_ID: import.meta.env.VITE_ONE_SIGNAL || "97778f54-120f-414b-a4d6-bd6883637e41",
});
