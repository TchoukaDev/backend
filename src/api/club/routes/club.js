"use strict";

/**
 * club router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/club/optimized",
      handler: "club.find", // utilise ton controller custom
      config: {
        auth: false,
        policies: ["global::require-api-token"],
      },
    },
  ],
};
