module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["name", "firstname", "telephone"],
      },
    },
  },
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
});
