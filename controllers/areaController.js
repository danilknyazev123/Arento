const {Area} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class AreaController {
    async create(req, res, next) {
        try{
            const {value} = req.body
            const area = await Area.create({value})
            return res.json(area)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const area = await Area.findAll()
            return res.json(area)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }
}

module.exports = new AreaController()