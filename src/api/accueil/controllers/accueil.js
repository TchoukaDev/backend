"use strict";

/**
 * accueil controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::accueil.accueil", ({ strapi }) => ({
  async find(ctx) {
    const entry = await strapi.db.query("api::accueil.accueil").findOne({
      populate: {
        image: {
          select: ["id", "alternativeText", "url"],
        },
      },
    });
    return entry || [];
  },
}));
