const Router = require('express')
const router = new Router()
const floorController = require('../controllers/floorController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), floorController.create)
router.get('/', floorController.getAll)

module.exports = router