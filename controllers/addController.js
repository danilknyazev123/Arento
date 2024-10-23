const uuid = require('uuid')
const path = require('path');
const {Add, AddInfo, User} = require('../models/models')
const ApiError = require('../exceptions/apiError')
const {appendFile} = require("fs");
const AddService = require('../service/addService')
const { Op} = require('sequelize')

class AddController {
    async create(req, res, next){
        try{
            if(!req.files.length){
                const {img} = req.files

                let {title, phone, address, description, price, square, link, animal, children, smoking, email, activationLink,
                    floorId, roomId, bedroomId, buildingId, repairId, heatingId, areaId, parkingId, userId, info, longitude, latitude} = req.body

                const user = await User.findByPk(userId)
                if(!user){
                    return next(ApiError.BadRequest('Ошибка создания объявления'));
                }
                if(user.activationLink === activationLink && user.email === email){
                    let where = await AddService.takeAddParams(title, phone, address, description, price, square, link, animal, children, smoking,
                        floorId, roomId, bedroomId, buildingId, repairId, heatingId, areaId, parkingId, userId, longitude, latitude)

                    const add = await Add.create(where)
                    let fs = require('fs');
                    fs.open('static/adds/user' + userId + '/' + add.id + '.txt', 'w+', err => {
                        if(err) return next(ApiError.BadRequest('Папка не существует'));
                    })
                    fs.mkdir('static/adds/user' + userId + '/' + add.id, err => {
                        if(err) return next(ApiError.BadRequest('Папка не найдена'));
                    });
                    Array.from(img).forEach(image => {
                        let fileName = uuid.v4() + ".jpg"
                        image.mv(path.resolve(__dirname, '..', 'static/adds/user' + userId + '/' + add.id, fileName))
                        appendFile(path.normalize('static/adds/user' + userId + '/' + add.id + '.txt'), fileName + '\n', (err) => {
                            if(err) return next(ApiError.BadRequest('Ошибка создания объявления'));
                        })
                    })

                    let arr;
                    let image = ''
                    fs.readFile('static/adds/user' + userId + '/' + add.id + '.txt', 'utf8', async (err, data) => {
                        if (err) return next(ApiError.BadRequest('Ошибка создания объявления'));
                        arr = data.split('\n').filter(Boolean);
                        image = arr[0]
                        add.image = image
                        await add.save()
                    })

                    if (info) {
                        info = JSON.parse(info)
                        info.forEach(i =>
                            AddInfo.create({
                                title: i.title,
                                description: i.description,
                                addId: add.id
                            })
                        )
                    }
                    return res.json(add)
                } else {
                    return next(ApiError.BadRequest('Недостаточно прав'))
                }
            } else {
                return next(ApiError.BadRequest('Вы не добавили изображения или произошла ошибка с загрузкой изображений'))
            }
        } catch (e) {
            return next(ApiError.BadRequest('Ошибка создания объявления'))
        }
    }

    async getAll(req, res, next){
        let {minPrice, maxPrice, minSquare, maxSquare, minFloorId, maxFloorId, minRoomId, maxRoomId, minBedroomId, maxBedroomId,
            buildingId, repairId, heatingId, areaId, parkingId, animal, children, smoking,
            limit, page} = req.query

        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        minPrice = minPrice || 0
        maxPrice = maxPrice || 10000000
        minSquare = minSquare || 0
        maxSquare = maxSquare || 10000000
        minFloorId = minFloorId || 0
        maxFloorId = maxFloorId || 20
        minRoomId = minRoomId || 0
        maxRoomId = maxRoomId || 10
        minBedroomId = minBedroomId || 0
        maxBedroomId = maxBedroomId || 20

        let building = [1, 2, 3]
        let repair = [1, 2, 3, 4]
        let heating = [1, 2, 3]
        let area = [1, 2, 3, 4, 5, 6, 7]
        let parking = [1, 2, 3]


        if (!animal && !children && !smoking) {
            animal = [0, 1]
            children = [0, 1]
            smoking = [0, 1]
        } else if (!animal && !children && smoking) {
            animal = [0, 1]
            children = [0, 1]
        } else if (!animal && children && !smoking) {
            animal = [0, 1]
            smoking = [0, 1]
        } else if (!animal && children && smoking) {
            animal = [0, 1]
        } else if (animal && !children && !smoking) {
            children = [0, 1]
            smoking = [0, 1]
        } else if (animal && !children && smoking) {
            children = [0, 1]
        } else if (animal && children && !smoking) {
            smoking = [0, 1]
        }

        if(buildingId){
            building = buildingId.split('').filter(Boolean) || 0
        }
        if(repairId){
            repair = repairId.split('').filter(Boolean) || 0
        }
        if(heatingId){
            heating = heatingId.split('').filter(Boolean) || 0
        }
        if(areaId){
            area = areaId.split('').filter(Boolean) || 0
        }
        if(parkingId){
            parking = parkingId.split('').filter(Boolean) || 0
        }

        try {
            const adds = await Add.findAndCountAll({
                subQuery: false,
                where: {
                    price:{
                        [Op.between]: [minPrice, maxPrice],
                    },
                    square:{
                        [Op.between]: [minSquare, maxSquare],
                    },
                    floorId:{
                        [Op.between]: [minFloorId, maxFloorId],
                    },
                    roomId:{
                        [Op.between]: [minRoomId, maxRoomId],
                    },
                    bedroomId:{
                        [Op.between]: [minBedroomId, maxBedroomId],
                    },
                    buildingId:{
                        [Op.or]: [building],
                    },
                    repairId:{
                        [Op.or]: [repair],
                    },
                    heatingId:{
                        [Op.or]: [heating],
                    },
                    areaId:{
                        [Op.or]: [area],
                    },
                    parkingId:{
                        [Op.or]: [parking],
                    },
                    isPublic:{
                        [Op.not]: '',
                    },
                    isChecked:{
                        [Op.eq]: true,
                    },
                    updatedAt: {
                        [Op.lte]: new Date(),
                        [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
                    },
                    [Op.or]: {
                        [Op.and]:
                            {
                                animal:{
                                    [Op.or]: [animal],
                                },
                                children:{
                                    [Op.or]: [children]
                                },
                                smoking:{
                                    [Op.or]: [smoking]
                                },
                            }
                    }
                },
                order: [['updatedAt', 'DESC']],
                limit,
                offset
            });
            return res.json(adds)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getUserAdds(req, res, next){
        let {id, userId, limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let adds;

        try {
            if (Number(userId) === Number(id)) {
                adds = await Add.findAndCountAll({where:{userId}, limit, offset})
            } else {
                adds = await Add.findAndCountAll(
                    {
                        where:
                            {
                                userId,
                                isPublic:{
                                    [Op.not]: '',
                                },
                                isChecked:{
                                    [Op.eq]: true,
                                },
                                updatedAt: {
                                    [Op.lte]: new Date(),
                                    [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
                                },
                            },
                        limit,
                        offset
                    }
                )
            }

            return res.json(adds)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const add = await Add.findOne(
                {
                    where: {id},
                    include: [{model: AddInfo, as: 'info'}]
                },
            )
            return res.json(add)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getChecked(req, res, next) {

        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let adds;

        try {
            adds = await Add.findAndCountAll({
                where:{
                    isChecked:{
                        [Op.is]: false,
                    },
                    isPublic:{
                        [Op.not]: '',
                    }
                },
                limit,
                offset
            })
            return res.json(adds)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }

    }

    async update(req, res, next){
        let {id} = req.body

        try{
            const add = await Add.update(
                {
                    isPublic: 'yes',
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            return res.json(add)
        } catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }

    async check(req, res, next){
        let {id, longitude, latitude, areaId} = req.body

        try{
            const add = await Add.update(
                {
                    isChecked: 'yes',
                    longitude: longitude,
                    latitude: latitude,
                    areaId: areaId
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            return res.json(add)
        } catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }

    async reject(req, res, next){
        let {id, message} = req.body

        try{
            const add = await Add.update(
                {
                    message: message,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            return res.json(add)
        } catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }

    async stop(req, res, next) {
        let {id} = req.body

        try{
            const add = await Add.update(
                {
                    isChecked: 'false',
                    isPublic: ''
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
            return res.json(add)
        } catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }
}

module.exports = new AddController()
