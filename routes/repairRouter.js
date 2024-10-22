const Router = require('express')
const router = new Router()
const repairController = require('../controllers/repairController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), repairController.create)
router.get('/', repairController.getAll)

module.exports = router