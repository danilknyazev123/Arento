const {Room} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class RoomController {
    async create(req, res, next){
        try{
            const {value} = req.body
            const room = await Room.create({value})
            return res.json(room)
        } catch (e) {
            return next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async getAll(req, res, next){
        try{
            const room = await Room.findAll()
            return res.json(room)
        } catch (e) {
            return next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

}

module.exports = new RoomController()