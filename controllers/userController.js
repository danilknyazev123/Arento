const uuid = require('uuid')
const path = require('path');
const {User} = require('../models/models')
const userService = require('../service/userService')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/apiError')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Проверьте корректность ввода электронной почты, а также длину пароля (не менее 8 знаков)', errors.array()))
            }
            const {email, nickname, password, role} = req.body
            let fileName = "EMPTY"
            if(req.files){
                const {img} = req.files
                fileName = uuid.v4() + ".jpg"
                await img.mv(path.resolve(__dirname, '..', 'static/users/userData', fileName))
            }
            const userData = await userService.registration(email, nickname, password, role, fileName)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await  userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async getOne(req, res, next) {
        try{
            const {id} = req.params
            const user = await User.findOne(
                {
                    where: {id}
                },
            )
            return res.json(user)
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }

    async check(req, res, next) {
        try {
            const {email} = req.body
            const userData = await userService.check(email)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(ApiError.BadRequest('Непредвиденная ошибка'))
        }
    }
}

module.exports = new UserController()