"use strict";

/**
 * section-animateur controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::section-animateur.section-animateur",
  ({ strapi }) => ({
    async find(ctx) {
      /**
       * Liste paginée des sections animateurs
       *
       * @route GET /api/section-animateurs?page=1&limit=5
       *
       * @param {Object} ctx - Contexte de la requête Koa
       * @param {Object} ctx.query - Paramètres de query string
       * @param {string} ctx.query.page - Numéro de la page (défaut: 1)
       * @param {string} ctx.query.limit - Nombre d'éléments par page (défaut: 5)
       *
       * @returns {Object} Réponse JSON avec données et métadonnées de pagination
       * @returns {Array} data - Tableau des entrées
       * @returns {Object} meta - Métadonnées de pagination
       * @returns {Object} meta.pagination - Détails de la pagination
       * @returns {number} meta.pagination.page - Page actuelle
       * @returns {number} meta.pagination.pageSize - Nombre d'éléments par page
       * @returns {number} meta.pagination.pageCount - Nombre total de pages
       * @returns {number} meta.pagination.total - Nombre total d'éléments */

      const page = Math.max(parseInt(ctx.query.page) || 1, 1); // Min 1
      const requestedLimit = parseInt(ctx.query.limit) || 5;
      const limit = Math.min(Math.max(requestedLimit, 1), 100); // Entre 1 et 100

      const entries = await strapi.db
        .query("api::section-animateur.section-animateur")
        .findMany({
          select: ["id", "titre", "slug", "contenu", "updatedAt"],
          orderBy: { updatedAt: "desc" },
          offset: (page - 1) * limit,
          limit: limit,
        });

      const total = await strapi.db
        .query("api::section-animateur.section-animateur")
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
        .query("api::section-animateur.section-animateur")
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
        return ctx.notFound("Publication non trouvée");
      }

      return { data: entry, meta: {} };
    },
  }),
);
