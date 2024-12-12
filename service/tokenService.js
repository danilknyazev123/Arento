const jwt = require('jsonwebtoken')
const {TokenModel} = require('../models/models')
class TokenService {
    generateTokens(payload){
        try{
            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30d'})
            const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {expiresIn: '120d'})
            return {
                accessToken,
                refreshToken
            }
        } catch (e) {
            return null
        }
    }

    validateAccessToken(token){
        try{
            return jwt.verify(token, process.env.SECRET_KEY)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token){
        try{
            return jwt.verify(token, process.env.SECRET_KEY_REFRESH)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        try{
            const tokenData = await TokenModel.findOne({user: userId})
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            return await TokenModel.create({user: userId, refreshToken});
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        try{
            return await TokenModel.destroy({where: {refreshToken}})
        }catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        try{
            return await TokenModel.findOne({where: {refreshToken}})
        }catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()