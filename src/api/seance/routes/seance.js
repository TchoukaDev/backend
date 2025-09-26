"use strict";

/**
 * seance router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/seance/optimized",
      handler: "seance.find",
      config: { auth: false },
    },
  ],
};
