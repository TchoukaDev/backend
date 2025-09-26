"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/galerie/optimized",
      handler: "galerie.find", // utilise ton controller custom
      config: {
        auth: false,
      },
    },
  ],
};
