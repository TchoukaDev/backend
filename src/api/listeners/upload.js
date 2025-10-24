// src/listeners/upload.js - Hook pour auto-remplir l'alternative text des images
module.exports = {
  // Écoute les événements sur le plugin upload de Strapi (gestion des médias)
  "plugin::upload.file": {
    /**
     * Hook exécuté AVANT la création d'un nouveau fichier dans la médiathèque
     * @param {Object} event - L'événement contenant les données du fichier
     */
    beforeCreate(event) {
      // Extraction des données du fichier depuis l'événement
      const { data } = event.params;

      // Vérifie que :
      // 1. Le fichier a un nom (data.name existe)
      // 2. L'alternative text n'est pas déjà défini (pour ne pas écraser une valeur existante)
      if (data.name && !data.alternativeText) {
        // Extrait le nom du fichier sans son extension
        // Ex: "mon-image.jpg" devient "mon-image"
        const fileNameWithoutExtension = data.name
          .split(".") // Sépare par le point ["mon-image", "jpg"]
          .slice(0, -1) // Prend tout sauf le dernier élément ["mon-image"]
          .join("."); // Rejoint avec un point (au cas où il y aurait plusieurs points)

        // Assigne automatiquement le nom sans extension comme alternative text
        data.alternativeText = fileNameWithoutExtension;
      }
    },

    /**
     * Hook exécuté AVANT la mise à jour d'un fichier existant
     * Même logique que beforeCreate pour maintenir la cohérence
     * @param {Object} event - L'événement contenant les données du fichier
     */
    beforeUpdate(event) {
      // Extraction des données du fichier depuis l'événement
      const { data } = event.params;

      // Même vérification que dans beforeCreate
      // Ne remplit l'alt text que s'il est vide (pour ne pas écraser les modifications manuelles)
      if (data.name && !data.alternativeText) {
        // Extraction du nom sans extension
        const fileNameWithoutExtension = data.name
          .split(".") // Sépare par le point
          .slice(0, -1) // Retire l'extension
          .join("."); // Rejoint (gère les noms avec plusieurs points)

        // Attribution automatique de l'alternative text
        data.alternativeText = fileNameWithoutExtension;
      }
    },
  },
};
