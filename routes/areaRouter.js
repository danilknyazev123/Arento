const Router = require('express')
const router = new Router()
const areaController = require('../controllers/areaController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), areaController.create)
router.get('/', areaController.getAll)

module.exports = router