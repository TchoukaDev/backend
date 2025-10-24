module.exports = {
  routes: [
    {
      method: "GET",
      path: "/infos",
      handler: "info.find",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
    {
      method: "GET",
      path: "/infos/:slug",
      handler: "info.findBySlug",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
