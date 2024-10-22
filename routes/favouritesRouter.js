const Router = require('express')
const router = new Router()
const favouritesController = require('../controllers/favouritesController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), favouritesController.create)
router.get('/', favouritesController.getAll)

module.exports = router