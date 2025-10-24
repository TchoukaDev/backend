module.exports = {
  routes: [
    {
      method: "GET",
      path: "/competitions",
      handler: "competition.find",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
    {
      method: "GET",
      path: "/competitions/:slug",
      handler: "competition.findBySlug",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
