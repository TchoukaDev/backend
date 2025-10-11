"use strict";

/**
 * club controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::club.club", ({ strapi }) => ({
  async find(ctx) {
    const entry = await strapi.db.query("api::club.club").findOne({
      populate: {
        animateurs: {
          populate: {
            file: {
              select: ["id", "url", "formats", "alternativeText", "caption"],
            },
            orderBy: { order: "asc" },
          },
        },
      },
      select: ["titre1", "contenu", "titre2", "titreprincipal"],
    });

    return entry || [];
  },
}));
