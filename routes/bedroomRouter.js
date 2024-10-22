const Router = require('express')
const router = new Router()
const bedroomController = require('../controllers/bedroomController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), bedroomController.create)
router.get('/', bedroomController.getAll)

module.exports = router