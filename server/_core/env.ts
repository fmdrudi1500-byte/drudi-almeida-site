export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Google Calendar OAuth2
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN ?? "",
  // Google Calendar IDs per unit (set after OAuth authorization + calendar creation)
  gcalLapa: process.env.GCAL_LAPA ?? "",
  gcalSantana: process.env.GCAL_SANTANA ?? "",
  gcalSaoMiguel: process.env.GCAL_SAO_MIGUEL ?? "",
  gcalTatuape: process.env.GCAL_TATUAPE ?? "",
  gcalGuarulhos: process.env.GCAL_GUARULHOS ?? "",
};
