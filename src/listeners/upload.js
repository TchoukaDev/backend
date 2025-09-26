// ./src/listeners/upload.js
export default {
  "plugin::upload.file": {
    beforeCreate(file) {
      // Vérifie si le nom du fichier existe et si l'alternativeText n'est pas déjà défini
      if (file.name && !file.alternativeText) {
        // Définit l'alternativeText par défaut avec le nom du fichier sans l'extension
        const fileNameWithoutExtension = file.name
          .split(".")
          .slice(0, -1)
          .join(".");
        file.alternativeText = fileNameWithoutExtension;
      }
    },
  },
};
