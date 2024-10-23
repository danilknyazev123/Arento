const {Bedroom} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class BedroomController {
    async create(req, res, next){
        try{
            const {value} = req.body
            const bedroom = await Bedroom.create({value})
            return res.json(bedroom)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const bedroom = await Bedroom.findAll()
            return res.json(bedroom)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

}

module.exports = new BedroomController()