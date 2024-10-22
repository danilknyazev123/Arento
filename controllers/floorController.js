const {Floor} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class FloorController {
    async create(req, res){
        const {value} = req.body
        const floor = await Floor.create({value})
        return res.json(floor)
    }

    async getAll(req, res){
        const floor = await Floor.findAll()
        return res.json(floor)
    }

}

module.exports = new FloorController()