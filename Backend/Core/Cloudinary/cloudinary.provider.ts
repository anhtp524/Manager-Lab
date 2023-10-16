import { ConfigOptions, v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: "dclbvhhup",
      api_key: "874763675959441",
      api_secret: "4rmhVjSGswooX7DLo9Lpti-s3mM"
    });
  },
};