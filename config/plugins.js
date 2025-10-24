module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["name", "firstname", "telephone", "isLicensed"],
      },
    },
  }, //Ajouter le provider cloudinary pour gérer l'upload sur cloudinary
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
        secure: true,
      },
      actionOptions: {
        upload: {
          folder: env("CLOUDINARY_FOLDER", "strapi"),
          resource_type: "auto",
        },
        uploadStream: {
          folder: env("CLOUDINARY_FOLDER", "strapi"),
          resource_type: "auto",
        },
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"),
      },
      settings: {
        defaultFrom: env("RESEND_FROM"),
        defaultReplyTo: env("RESEND_REPLY_TO"),
      },
    },
  },
});
