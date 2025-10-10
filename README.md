```
VITE_BACKEND_URL="http://172.17.0.200:8888/api"
VITE_LARAVEL_URL="http://172.17.0.30:8000"
VITE_TOKEN_KEY="token"
VITE_METEO_WEATHER_URL="https://api.open-meteo.com/v1/forecast?latitude=16.79046448163847&longitude=107.11369981925334&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean&current=temperature_2m,weather_code,is_day,relative_humidity_2m&timezone=Asia%2FBangkok"
```

```
module.exports = {
  apps: [
    {
      name: "frontend",
      script: "bun",
      args: "start",
      autorestart: true,
      watch: false,
      ignore_watch: ["node_modules", "logs"],
    },
  ],
};
```
