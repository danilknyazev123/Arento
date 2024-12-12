const {Repair} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class RepairController {
    async create(req, res, next) {
        try{
            const {value} = req.body
            const repair = await Repair.create({value})
            return res.json(repair)
        } catch (e) {
            return next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async getAll(req, res, next) {
        try{
            const repair = await Repair.findAll()
            return res.json(repair)
        } catch (e) {
            return next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

}

module.exports = new RepairController()