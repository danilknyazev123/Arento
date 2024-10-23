const uuid = require('uuid')
const path = require('path');
const {Blog} = require('../models/models')
const ApiError = require('../exceptions/apiError')

class BlogController {
    async create(req, res, next){
        try{
            let {title, description} = req.body
            const {img} = req.files


            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static/' + 'blog', fileName))
            const blog = await Blog.create({title, description, photo: fileName})
            return res.json(blog)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {limit, page} = req.query

        page = page || 1
        limit = limit || 20

        let offset = page * limit - limit
        let blog;

        blog = await Blog.findAndCountAll({limit, offset})

        return res.json(blog)
    }
}

module.exports = new BlogController()