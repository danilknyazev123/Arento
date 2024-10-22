const Router = require('express')
const router = new Router()
const placesController = require('../controllers/placesController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), placesController.create)
router.get('/', placesController.getAll)
router.get('/:id', placesController.getOne);


module.exports = router