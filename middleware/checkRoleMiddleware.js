const  jwt = require('jsonwebtoken')
const ApiError = require("../exceptions/apiError");
const tokenService = require("../service/tokenService");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return next(ApiError.UnauthorizedError())
            }
            const decoded = tokenService.validateAccessToken(token)
            if(decoded.role !== role) {
                return next(ApiError.NoAccess())
            }
            req.user = decoded
            next()
        } catch (e) {
            return next(ApiError.UnauthorizedError())
        }
    };
}
