const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB file size limit
    fieldSize: 20 * 1024 * 1024, // 20 MB field size limit
  },
});

module.exports = upload;
