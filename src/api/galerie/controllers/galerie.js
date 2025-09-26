"use strict";

/**
 * galerie controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::galerie.galerie", ({ strapi }) => ({
  async find(ctx) {
    const entry = await strapi.db.query("api::galerie.galerie").findOne({
      populate: { photos: { select: ["id", "url", "alternativeText"] } },
      select: ["titreprincipal"],
    });

    return entry || [];
  },
}));
