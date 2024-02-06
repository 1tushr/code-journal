const cloudinary = require("v2").cloudinary();
const fs = require("fs");

cloudinary.cofig({
  cloud_name: process.env.CLOUDINAY_CLOUD_NAME,
  api_key: process.env.CLOUDINAY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY,
});
