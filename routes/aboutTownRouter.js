const Router = require('express')
const router = new Router()
const aboutTownRouter = require('../controllers/aboutTownController')

router.get('/', aboutTownRouter.getAll)

module.exports = router