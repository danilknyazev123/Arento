const {Area} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class AreaController {
    async create(req, res) {
        const {value} = req.body
        const area = await Area.create({value})
        return res.json(area)
    }

    async getAll(req, res){
        const area = await Area.findAll()
        return res.json(area)
    }

}

module.exports = new AreaController()