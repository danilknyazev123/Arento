const {Parking} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class ParkingController {
    async create(req, res, next) {
        try{
            const {value} = req.body
            const parking = await Parking.create({value})
            return res.json(parking)
        } catch (e){
            next(ApiError.BadRequest(e.message))
        }

    }

    async getAll(req, res, next){
        try{
            const parking = await Parking.findAll()
            return res.json(parking)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

}

module.exports = new ParkingController()