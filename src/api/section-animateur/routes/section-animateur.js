module.exports = {
  routes: [
    {
      method: "GET",
      path: "/section-animateurs",
      handler: "section-animateur.find",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
    {
      method: "GET",
      path: "/section-animateurs/:slug",
      handler: "section-animateur.findBySlug",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
