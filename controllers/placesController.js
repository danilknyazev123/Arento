const path = require('path');
const {Place} = require('../models/models')
const ApiError = require('../exceptions/apiError')


class PlacesController {

    async create(req, res, next) {
        try {
            let {title, description1, description2, description3} = req.body

            const {img} = req.files

            let photo1 = ''
            let photo2 = ''
            let photo3 = ''

            if (img[0]){
                photo1 = img[0].name
            }

            if (img[1]){
                photo2 = img[1].name
            } else {
                photo2 = null
            }

            if (img[2]){
                photo3 = img[2].name
            } else {
                photo3 = null
            }


            let fs = require('fs');

            const place = await Place.create({title, description1, photo1, description2, photo2, description3, photo3})

            fs.mkdir('static/places/place' + place.id, err => {
                if(err) throw err;
            });

            Array.from(img).forEach(image => {
                image.mv(path.resolve(__dirname, '..', 'static/places/place' + place.id, image.name))
            })

            return res.json(place)
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try{
            let {limit, page} = req.query

            page = page || 1
            limit = limit || 33

            let offset = page * limit - limit
            let places;

            places = await Place.findAndCountAll(
                {
                    order: [['id', 'ASC']],
                    limit,
                    offset
                }
            )

            return res.json(places)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params

            const place = await Place.findOne(
                {
                    where: {id}
                }
            )

            return res.json(place)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PlacesController()