const multer = require('multer');
const path = require('path'); 

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // save uploaded files in uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // set filename as current timestamp + original extension
  }
});

const upload = multer({storage: storage}).single('image');

module.exports = upload;