"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::competition.competition",
  ({ strapi }) => ({
    async find(ctx) {
      const page = parseInt(ctx.query.page) || 1;
      const limit = parseInt(ctx.query.limit) || 5;

      const entries = await strapi.db
        .query("api::competition.competition")
        .findMany({
          select: ["id", "titre", "slug", "contenu", "updatedAt"],
          orderBy: { updatedAt: "desc" },
          offset: (page - 1) * limit,
          limit: limit,
        });

      const total = await strapi.db
        .query("api::competition.competition")
        .count({});

      return {
        data: entries,
        meta: {
          pagination: {
            page: page,
            pageSize: limit,
            pageCount: Math.ceil(total / limit),
            total: total,
          },
        },
      };
    },

    async findBySlug(ctx) {
      const { slug } = ctx.params;

      const entry = await strapi.db
        .query("api::competition.competition")
        .findOne({
          where: { slug },
          populate: {
            images: {
              select: ["id", "url", "alternativeText"],
            },
            documents: {
              select: ["id", "url", "caption", "name"],
            },
          },
          select: ["id", "titre", "slug", "contenu", "createdAt", "updatedAt"],
        });

      if (!entry) {
        return ctx.notFound("Info non trouvée");
      }

      return { data: entry, meta: {} };
    },
  }),
);
