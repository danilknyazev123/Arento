const {Building} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class BuildingController {
    async create(req, res, next) {
        try{
            const {value} = req.body
            const building = await Building.create({value})
            return res.json(building)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const rules = await Building.findAll()
            return res.json(rules)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

}

module.exports = new BuildingController()