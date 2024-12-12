
class AddService {


    async takeAddParams(title, phone, address, description, price, square, link, animal, children, smoking,
                     floorId, roomId, bedroomId, buildingId, repairId, heatingId,
                     areaId, parkingId, userId, info, longitude, latitude, image) {
        try{
            let where = {};
            if (title) where.title = title;
            if (phone) where.phone = phone;
            if (address) where.address = address;
            if (description) where.description = description;
            if (price) where.price = price;
            if (square) where.square = square;
            if (floorId) where.floorId = floorId;
            if (roomId) where.roomId = roomId;
            if (bedroomId) where.bedroomId = bedroomId;
            if (buildingId) where.buildingId = buildingId;
            if (repairId) where.repairId = repairId;
            if (heatingId) where.heatingId = heatingId;
            if (areaId) where.areaId = areaId;
            if (parkingId) where.parkingId = parkingId;
            if (userId) where.userId = userId;
            if (info) where.info = info;
            if (longitude) where.longitude = longitude;
            if (latitude) where.latitude = latitude;
            if (image) where.image = image;
            if (link) where.link = link
            if (animal) where.animal = animal
            if (children) where.children = children
            if (smoking) where.smoking = smoking

            return {...where}
        } catch (e) {
            return null
        }
    }
}

module.exports = new AddService()