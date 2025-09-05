module.exports = [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "http://localhost:3000", // local dev
        "https://exeonic-service-strapi-lfxn-m54g9uej2-awais-sufis-projects.vercel.app", // production frontend
        "https://www.your-frontend.com", // optional www alias
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"], // optional but safer
      keepHeadersOnError: true, // lets Strapi send CORS headers even on errors
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
