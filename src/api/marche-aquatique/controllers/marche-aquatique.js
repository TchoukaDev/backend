"use strict";

/**
 * marche-aquatique controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::marche-aquatique.marche-aquatique",
  ({ strapi }) => ({
    async find(ctx) {
      const entry = await strapi.db
        .query("api::marche-aquatique.marche-aquatique")
        .findOne({
          populate: {
            sections: {
              populate: {
                images: {
                  select: [
                    "id",
                    "url",
                    "formats",
                    "alternativeText",
                    "caption",
                  ],
                },
              },
              select: ["id", "titre", "contenu"],
            },
            orderBy: { order: "asc" },
          },
          select: ["titreprincipal"],
        });

      return entry || [];
    },
  }),
);
