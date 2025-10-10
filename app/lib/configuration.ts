/*
NEXT_PUBLIC_BACKEND_URL="http://172.17.0.200:8888/api"
NEXT_PUBLIC_LARAVEL_URL="http://172.17.0.200:8000"
NEXT_PUBLIC_TOKEN_KEY="token"
*/

export default () => ({
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  LARAVEL_URL: import.meta.env.VITE_LARAVEL_URL,
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "token",
});
