const {Bedroom} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class BedroomController {
    async create(req, res){
        const {value} = req.body
        const bedroom = await Bedroom.create({value})
        return res.json(bedroom)
    }

    async getAll(req, res){
        const bedroom = await Bedroom.findAll()
        return res.json(bedroom)
    }

}

module.exports = new BedroomController()