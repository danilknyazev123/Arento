const {Favourites} = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class FavouritesController {
    async create(req, res){
        const {value} = req.body
        const bedroom = await Favourites.create({value})
        return res.json(bedroom)
    }

    async getAll(req, res){
        const bedroom = await Favourites.findAll()
        return res.json(bedroom)
    }

}

module.exports = new FavouritesController()