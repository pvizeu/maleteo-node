var express = require('express');
var router = express.Router();

const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const userController = require('../controllers/userController')
const imgController = require('../controllers/cloudinaryController')
const experiencesController = require('../controllers/experiencesController')
const blogsController = require('../controllers/blogsController')
const spacesController = require('../controllers/spacesController')

router.route('/new')
.post(userController.newUser);


//espera query.email=pedro@mail.com sin ""
router.route('/users')
.get(userController.findOneUser)
.put(userController.updateOneUser);

router.route('/blogs')
.get(blogsController.fullListOfBlogs);

router.route('/experiences')
.get(experiencesController.fullListOfExperiences);

router.route('/spaces/new')
.post(spacesController.newSpace);

router.route('/spaces')
.get(spacesController.findSpaces);
module.exports = router;