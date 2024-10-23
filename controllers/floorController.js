const {Floor} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class FloorController {
    async create(req, res, next){
        try{
            const {value} = req.body
            const floor = await Floor.create({value})
            return res.json(floor)
        } catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const floor = await Floor.findAll()
            return res.json(floor)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }
}

module.exports = new FloorController()