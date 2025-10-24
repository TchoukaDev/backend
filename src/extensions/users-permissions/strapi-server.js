module.exports = (plugin) => {
  // Hook sur le modèle User
  plugin.contentTypes.user.lifecycles = {
    ...plugin.contentTypes.user.lifecycles,

    async beforeUpdate(event) {
      const { data, where } = event.params;

      // Si on débloque un compte (blocked passe à false)
      if (data.blocked === false) {
        // Récupérer l'utilisateur actuel
        const user = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          where.id,
        );

        // Si l'utilisateur était bloqué, réinitialiser les tentatives
        if (user && user.blocked === true) {
          console.log(
            `🔓 Déblocage du compte ${user.email}, réinitialisation des tentatives`,
          );
          data.loginAttempts = 0;
          data.lastFailedLogin = null;
        }
      }
    },
  };

  return plugin;
};
