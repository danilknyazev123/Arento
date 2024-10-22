const {Parking} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class ParkingController {
    async create(req, res) {
        const {value} = req.body
        const parking = await Parking.create({value})
        return res.json(parking)
    }

    async getAll(req, res){
        const parking = await Parking.findAll()
        return res.json(parking)
    }

}

module.exports = new ParkingController()