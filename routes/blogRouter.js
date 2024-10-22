const Router = require('express')
const router = new Router()
const blogController = require('../controllers/blogController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), blogController.create)
router.get('/', blogController.getAll)


module.exports = router