module.exports = {
  routes: [
    {
      method: "GET",
      path: "/boutiques",
      handler: "boutique.find",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
    {
      method: "GET",
      path: "/boutiques/:slug",
      handler: "boutique.findBySlug",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
