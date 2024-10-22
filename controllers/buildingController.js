const {Building} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class BuildingController {
    async create(req, res) {
        const {value} = req.body
        const building = await Building.create({value})
        return res.json(building)
    }

    async getAll(req, res){
        const rules = await Building.findAll()
        return res.json(rules)
    }

}

module.exports = new BuildingController()