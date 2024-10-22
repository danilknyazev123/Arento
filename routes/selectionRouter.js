const Router = require('express')
const router = new Router()
const selectionController = require('../controllers/selectionController')

router.post('/', selectionController.sendMail)

module.exports = router