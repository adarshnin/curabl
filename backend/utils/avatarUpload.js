const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/avatars')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
    cb(null, true);
  } else {
    console.log('Only jpg and png file supported!');
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = {upload};