"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/galerie",
      handler: "galerie.find", // utilise ton controller custom
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
