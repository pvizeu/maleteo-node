var express = require('express');
var router = express.Router();

const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
 const imgController = require('../controllers/cloudinaryController')

router.route('/imagen')
    .post(upload.single('image'), imgController);
module.exports = router;