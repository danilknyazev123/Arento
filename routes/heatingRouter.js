const Router = require('express')
const router = new Router()
const heatingController = require('../controllers/heatingController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), heatingController.create)
router.get('/', heatingController.getAll)

module.exports = router