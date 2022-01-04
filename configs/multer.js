const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  },
});

const upload = multer({ storage });
module.exports = upload;
