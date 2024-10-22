const {Heating} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class HeatingController {
    async create(req, res){
        const {value} = req.body
        const heat = await Heating.create({value})
        return res.json(heat)
    }

    async getAll(req, res){
        const heat = await Heating.findAll()
        return res.json(heat)
    }

}

module.exports = new HeatingController()