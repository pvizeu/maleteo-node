var express = require('express');
var router = express.Router();

const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const userController = require('../controllers/userController')
const imgController = require('../controllers/cloudinaryController')
const authController = require('../controllers/authController')
const reservationsController = require('../controllers/reservationsController')



router.route('/token')
    .get(authController.authUser, authController.getToken);


router.route('/imagen')
    .post(upload.single('image'), imgController, userController.addImgUser);
module.exports = router;

router.route('/reservations')
    .all(authController.verifyToken)
    .get(reservationsController.findReservations)
    .put(reservationsController.updatebyIdState)