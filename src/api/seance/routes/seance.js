"use strict";

/**
 * seance router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/seances/optimized",
      handler: "seance.find",
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
