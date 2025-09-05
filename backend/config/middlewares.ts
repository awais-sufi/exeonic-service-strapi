// config/middlewares.js
module.exports = [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: (origin) => {
        if (!origin) return true; // allow server-to-server calls
        return (
          [
            "http://localhost:3000",
            "https://exeonic-service-strapi-fpt3.vercel.app",
            "https://www.your-frontend.com",
          ].includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)
        );
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeadersOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
