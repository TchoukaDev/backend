// api/galerie/controllers/galerie.js
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

/**
 * Controller personnalisé pour la galerie
 * Gère la pagination des photos avec offset/limit
 */
module.exports = createCoreController("api::galerie.galerie", ({ strapi }) => ({
  /**
   * Récupère les photos de la galerie avec pagination
   *
   * Query params :
   * - limit : Nombre de photos à retourner (défaut: 20)
   * - offset : Position de départ dans la liste (défaut: 0)
   *
   * Retourne :
   * - titreprincipal : Titre de la galerie
   * - photos : Tableau de photos (slice selon offset/limit)
   * - totalPhotos : Nombre total de photos disponibles
   * - offset : Offset utilisé
   * - limit : Limite utilisée
   */
  async find(ctx) {
    try {
      // Récupération et validation des paramètres de pagination
      const { limit = 20, offset = 0 } = ctx.query;
      const photoLimit = parseInt(limit, 10);
      const photoOffset = parseInt(offset, 10);

      // Récupération de la galerie depuis la base de données
      const entry = await strapi.db.query("api::galerie.galerie").findOne({
        populate: {
          photos: { select: ["id", "url", "alternativeText", "caption"] },
        },
        select: ["titreprincipal"],
      });

      // Si aucune galerie n'existe, retourner une structure vide
      if (!entry) {
        return { photos: [], totalPhotos: 0 };
      }

      // Application de la pagination avec slice()
      // Exemple : offset=10, limit=5 → photos de 10 à 14
      const allPhotos = entry.photos || [];
      const slicedPhotos = allPhotos.slice(
        photoOffset,
        photoOffset + photoLimit,
      );

      // Retour des données paginées
      return {
        titreprincipal: entry.titreprincipal,
        photos: slicedPhotos, // Photos de la page demandée
        totalPhotos: allPhotos.length, // Total pour savoir s'il reste des photos
        offset: photoOffset, // Pour tracking
        limit: photoLimit, // Pour tracking
      };
    } catch (error) {
      console.error("❌ Erreur galerie:", error);
      return ctx.badRequest("Erreur lors de la récupération de la galerie");
    }
  },
}));
// Exemple
// Tu as 50 photos au total : [0, 1, 2, ... 49]

// Requête : ?limit=10&offset=0
// → Retourne photos 0-9

// Requête : ?limit=10&offset=10
// → Retourne photos 10-19

// Requête : ?limit=10&offset=40
// → Retourne photos 40-49
