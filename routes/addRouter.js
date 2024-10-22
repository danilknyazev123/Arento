const Router = require('express')
const router = new Router()
const addController = require('../controllers/addController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', addController.create)
router.post('/update', checkRole('ADMIN'), addController.update)
router.post('/check', checkRole('ADMIN'), addController.check)
router.post('/reject', checkRole('ADMIN'), addController.reject)
router.post('/stop', checkRole('ADMIN'), addController.stop)
router.get('/userAdds', addController.getUserAdds)
router.get('/', addController.getAll)
router.get('/checked', addController.getChecked)
router.get('/:id', addController.getOne) // !!!important!!! last get


module.exports = router