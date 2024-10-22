const {Room} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class RoomController {
    async create(req, res){
        const {value} = req.body
        const room = await Room.create({value})
        return res.json(room)
    }

    async getAll(req, res){
        const room = await Room.findAll()
        return res.json(room)
    }

}

module.exports = new RoomController()