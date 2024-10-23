const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//linking the backend and the cloudn=inary account
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//configuring the storage for the images uploaded to cloudinary account 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      format: async (req, file) => 'jpg',
      allowedFormats:['jpg', 'png', 'jpeg']
    },
  });


module.exports = {cloudinary , storage}