"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/marche-aquatique/optimized",
      handler: "marche-aquatique.find", // utilise ton controller custom
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
