"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::info.info", ({ strapi }) => ({
  async find(ctx) {
    const page = Math.max(parseInt(ctx.query.page) || 1, 1); // Min 1
    const requestedLimit = parseInt(ctx.query.limit) || 5;
    const limit = Math.min(Math.max(requestedLimit, 1), 100); // Entre 1 et 100

    const entries = await strapi.db.query("api::info.info").findMany({
      select: ["id", "titre", "slug", "contenu", "updatedAt"],
      orderBy: { updatedAt: "desc" },
      offset: (page - 1) * limit,
      limit: limit,
    });

    const total = await strapi.db.query("api::info.info").count({});

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

    const entry = await strapi.db.query("api::info.info").findOne({
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
}));
