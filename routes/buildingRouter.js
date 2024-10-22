const Router = require('express')
const router = new Router()
const buildingController = require('../controllers/buildingController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), buildingController.create)
router.get('/', buildingController.getAll)

module.exports = router