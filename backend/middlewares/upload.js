const multer = require("multer");
const path = require("path");

const uploadPath = path.join(__dirname, "..", "public");

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'employee-recognition/profile-pictures',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [{ width: 400, height: 400, crop: 'limit' }],
});

const upload = multer({ storage: storage });

module.exports = upload;
