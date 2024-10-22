const {Repair} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class RepairController {
    async create(req, res) {
        const {value} = req.body
        const repair = await Repair.create({value})
        return res.json(repair)
    }

    async getAll(req, res) {
        const repair = await Repair.findAll()
        return res.json(repair)
    }

}

module.exports = new RepairController()