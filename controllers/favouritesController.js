const {Favourites} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class FavouritesController {
    async create(req, res, next){
        try{
            const {value} = req.body
            const bedroom = await Favourites.create({value})
            return res.json(bedroom)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next){
        try{
            const bedroom = await Favourites.findAll()
            return res.json(bedroom)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }
}

module.exports = new FavouritesController()