const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, require: true},
    password: {type: DataTypes.TEXT, require: true},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
    img: {type: DataTypes.STRING, defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: "false"},
    activationLink: {type: DataTypes.STRING},
    isPaidSelection: {type: DataTypes.BOOLEAN, defaultValue: "false"}
})

const TokenModel = sequelize.define('tokenModel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.TEXT, required: true}
})

const Favourites = sequelize.define('favourites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const FavouritesAdds = sequelize.define('favouritesAdds', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Add = sequelize.define ('add', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER},
    isChecked: {type: DataTypes.BOOLEAN, defaultValue: "false"},
    description: {type: DataTypes.TEXT},
    rate: {type: DataTypes.FLOAT, defaultValue: 0},
    isPublic: {type: DataTypes.STRING, defaultValue: ''},
    image: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    square: {type: DataTypes.INTEGER},
    latitude: {type: DataTypes.FLOAT},
    longitude: {type: DataTypes.FLOAT},
    link: {type: DataTypes.TEXT},
    animal: {type: DataTypes.INTEGER, defaultValue: 0},
    children: {type: DataTypes.INTEGER, defaultValue: 0},
    smoking: {type: DataTypes.INTEGER, defaultValue: 0},
    message: {type: DataTypes.STRING, defaultValue: ""}
})

const AddInfo = sequelize.define('add_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Parking = sequelize.define('parking', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true}
})

const Area = sequelize.define('area', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true}
})

const Building = sequelize.define('building', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true}
})

const Repair = sequelize.define('repair', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true}
})

const Heating = sequelize.define('heating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true}
})

const Floor = sequelize.define('floor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.INTEGER, unique: true}
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true}
})

const Bedroom = sequelize.define('bedroom', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.INTEGER, unique: true}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: true}
})

const View = sequelize.define('view', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Blog = sequelize.define('blog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    photo: {type: DataTypes.STRING}
})

const Place = sequelize.define('place', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description1: {type: DataTypes.TEXT},
    photo1: {type: DataTypes.STRING, defaultValue: "0"},
    description2: {type: DataTypes.TEXT, defaultValue: "0"},
    photo2: {type: DataTypes.STRING, defaultValue: "0"},
    description3: {type: DataTypes.TEXT, defaultValue: "0"},
    photo3: {type: DataTypes.STRING, defaultValue: "0"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_add', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

User.hasOne(TokenModel)
TokenModel.belongsTo(User)

User.hasOne(Favourites)
Favourites.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(View)
View.belongsTo(User)

Favourites.hasMany(FavouritesAdds)
FavouritesAdds.belongsTo(Favourites)

FavouritesAdds.hasOne(Add)
Add.belongsTo(FavouritesAdds)

Area.hasMany(Add)
Add.belongsTo(Area)

Parking.hasMany(Add)
Add.belongsTo(Parking)

Floor.hasMany(Add)
Add.belongsTo(Floor)

Room.hasMany(Add)
Add.belongsTo(Room)

Bedroom.hasMany(Add)
Add.belongsTo(Bedroom)

Building.hasMany(Add)
Add.belongsTo(Building)

Repair.hasMany(Add)
Add.belongsTo(Repair)

Heating.hasMany(Add)
Add.belongsTo(Heating)

Add.hasMany(AddInfo, {as: 'info'});
AddInfo.belongsTo(Add)

module.exports = {
    User,
    Favourites,
    Basket,
    BasketDevice,
    FavouritesAdds,
    Add,
    Rating,
    View,
    Building,
    Repair,
    Heating,
    Floor,
    Room,
    Bedroom,
    AddInfo,
    Blog,
    Parking,
    Area,
    TokenModel,
    Place
}