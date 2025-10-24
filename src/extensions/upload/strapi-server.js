// Assigner un AlternativeText automatiquement à l'upload d'un fichier dans la bibliothèse de Strapi
module.exports = (plugin) => {
  plugin.contentTypes.file.lifecycles = {
    async beforeCreate(event) {
      const { data } = event.params;

      if (!data.alternativeText && data.name) {
        // Supprimer l'extension du nom de fichier
        const fileNameWithoutExt = data.name.replace(/\.[^/.]+$/, "");
        data.alternativeText = fileNameWithoutExt;
      }
    },
  };

  return plugin;
};
