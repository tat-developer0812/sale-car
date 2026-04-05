export default ({ env }) => ({
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local') === 'cloudinary'
        ? '@strapi/provider-upload-cloudinary'
        : 'local',
      providerOptions: env('UPLOAD_PROVIDER', 'local') === 'cloudinary'
        ? {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
          }
        : {},
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
});
