const {Heating} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class HeatingController {
    async create(req, res, next){
        try{
            const {value} = req.body
            const heat = await Heating.create({value})
            return res.json(heat)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const heat = await Heating.findAll()
            return res.json(heat)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

}

module.exports = new HeatingController()