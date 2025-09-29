"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::info.info", ({ strapi }) => ({
  async find(ctx) {
    // URL minimale : ?page=2&limit=5 au lieu de pagination[page]=2&pagination[pageSize]=5
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 5;

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

  async findOne(ctx) {
    const slug = ctx.params.id; //Strapi utilise toujours par défaut id dans la route fin one (/infos/:id)

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
