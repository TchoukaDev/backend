module.exports = {
  routes: [
    {
      method: "GET",
      path: "/infos",
      handler: "info.find",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/infos/:slug",
      handler: "info.findBySlug",
      config: {
        auth: false,
      },
    },
  ],
};
