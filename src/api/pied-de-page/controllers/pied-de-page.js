"use strict";

/**
 * pied-de-page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::pied-de-page.pied-de-page",
  ({ strapi }) => ({
    async find(ctx) {
      const entry = await strapi.db
        .query("api::pied-de-page.pied-de-page")
        .findOne({
          populate: {
            liens1: { select: ["id", "nom", "url"] },
            liens2: { select: ["id", "nom", "url"] },
            orderBy: { order: "desc" },
          },
          select: ["titre1", "titre2"],
        });

      return entry || [];
    },
  }),
);
