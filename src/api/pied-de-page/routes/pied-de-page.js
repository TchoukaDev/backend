"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pied-de-page/optimized",
      handler: "pied-de-page.find", // utilise ton controller custom
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
