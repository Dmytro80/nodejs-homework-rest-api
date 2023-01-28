const multer = require("multer");
const path = require("path");

const tempPath = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;
