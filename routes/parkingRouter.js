const Router = require('express')
const router = new Router()
const parkingController = require('../controllers/parkingController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), parkingController.create)
router.get('/', parkingController.getAll)

module.exports = router