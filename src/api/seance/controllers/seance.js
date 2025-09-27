"use strict";

/**
 * seance controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::seance.seance", ({ strapi }) => ({
  async find(ctx) {
    const entry = await strapi.db.query("api::seance.seance").findOne({
      populate: {
        tableau: true,
        pdf: {
          populate: {
            pdf: ["url", "alternativeText"],
          },
          select: ["titre"],
        },
      },
      select: ["titre1", "titre2", "titreprincipal"],
    });

    return entry || [];
  },
}));
