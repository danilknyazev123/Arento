const ApiError = require('../exceptions/apiError')
const mailService = require("../service/mailService");

class SelectionController {
    async sendMail(req, res, next){
        try{
            let {name, area, firstDate, lastDate, peopleCount, roomCount, budget, animal, animalDesc, wishes, phone} = req.body
            if(wishes === ''){
                wishes = 'Пожеланий нет'
            }
            if(name && phone && area && firstDate && lastDate && peopleCount && roomCount && budget){
                if(animal === 'true' && animalDesc){
                    animal = 'Да'
                    await mailService.sendSelectionApplicationAnimal(name, area, firstDate, lastDate, peopleCount, roomCount, budget, animal, animalDesc, wishes, phone)
                } else {
                    await mailService.sendSelectionApplication(name, area, firstDate, lastDate, peopleCount, roomCount, budget, wishes, phone)
                }
            } else {
                next(ApiError.BadRequest('Не указан один или несколько параметров'))
            }
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }
}

module.exports = new SelectionController()