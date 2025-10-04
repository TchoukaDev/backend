"use strict";

/**
 * accueil router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/accueil/optimized",
      handler: "accueil.find",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
