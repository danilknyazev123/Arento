const {User, TokenModel, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError')
const fs = require("fs");

class UserService {
    async registration(email, nickname, password, role, img) {
        const candidate = await User.findOne({where:{email: `${email}`}})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({email, nickname, password: hashPassword, activationLink, img})
        const tokenModel = await TokenModel.create({userId: user.id})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
        let fs = require('fs');
        fs.mkdir('static/users/user' + user.id, { recursive: true }, err => {
            if(err) throw err;
        });
        fs.mkdir('static/adds/user' + user.id, { recursive: true }, err => {
            if(err) throw err;
        });
        const userDto = new UserDto(user)
        const basket = await Basket.create({userId: user.id})
        const tokens =  tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: UserDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: { activationLink: `${activationLink}`}})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password){
        const user = await User.findOne({where:{email}})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        if (user.isActivated === false){
            throw ApiError.BadRequest('Активируйте аккаунт перейдя по ссылке в письме')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken){
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        return await User.findAll()
    }

    async check(email) {
        const user = await User.findOne({where:{email: `${email}`}})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()