"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */

  async bootstrap({ strapi }) {
    const superAdminRole = await strapi.db.query("admin::role").findOne({
      where: { code: "strapi-super-admin" },
    });

    if (!superAdminRole) {
      console.warn("⚠️ Super Admin role not found");
      return;
    }

    // Permissions nécessaires pour gérer les rôles users-permissions
    const permissionsToCreate = [
      {
        action: "plugin::content-manager.explorer.read",
        subject: "plugin::users-permissions.role",
      },
      {
        action: "plugin::content-manager.explorer.create",
        subject: "plugin::users-permissions.role",
      },
      {
        action: "plugin::content-manager.explorer.update",
        subject: "plugin::users-permissions.role",
      },
    ];

    for (const permData of permissionsToCreate) {
      const exists = await strapi.db.query("admin::permission").findOne({
        where: {
          action: permData.action,
          subject: permData.subject,
        },
      });

      if (!exists) {
        const permission = await strapi.db.query("admin::permission").create({
          data: {
            ...permData,
            actionParameters: {},
            properties: {},
            conditions: [],
          },
        });

        await strapi.db.query("admin::permission").update({
          where: { id: permission.id },
          data: { role: superAdminRole.id },
        });

        console.log(`✅ Permission créée: ${permData.action}`);
      }
    }
  },
};
