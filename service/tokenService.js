const jwt = require('jsonwebtoken')
const {TokenModel} = require('../models/models')
class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.SECRET_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.SECRET_KEY_REFRESH)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await TokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.destroy({where:{refreshToken}})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({where:{refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()