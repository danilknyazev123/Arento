const Router = require('express')
const router = new Router()
const aboutUsRouter = require('../controllers/aboutUsController')
const aboutTownRouter = require("../controllers/aboutTownController");

router.get('/', aboutTownRouter.getAll)

module.exports = router