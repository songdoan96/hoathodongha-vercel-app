export default () => ({
  port: process.env.PORT || 8888,
  jwt: {
    secret: process.env.JWT_SECRET || 'd2b67382-8f59-4c5f-9536-ff96c9bdd42d',
    expiresIn: process.env.JWT_EXPIRES || '10d',
    // maxAge: Number(process.env.MAX_AGE),
  },
  frontendUrl: process.env.FRONTEND_URL,
  onesignal: {
    app_id: process.env.ONESIGNAL_APP_ID,
    auth: process.env.ONESIGNAL_AUTH,
  },
});
