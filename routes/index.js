const Router = require('express')
const router = new Router()

const AddRouter = require('./addRouter')
const UserRouter = require('./userRouter')
const BuildingRouter = require('./buildingRouter')
const RepairRouter = require('./repairRouter')
const HeatingRouter = require('./heatingRouter')
const FloorRouter = require('./floorRouter')
const RoomRouter = require('./roomRouter')
const BedroomRouter = require('./bedroomRouter')

const FavouritesRouter = require('./favouritesRouter')
const aboutTownRouter = require('./aboutTownRouter')
const BlogRouter = require('./blogRouter')
const AboutUsRouter = require('./aboutUsRouter')
const AreaRouter = require('./areaRouter')
const ParkingRouter = require('./parkingRouter')
const PlacesRouter = require('./placesRouter')

const SelectionRouter = require('./selectionRouter')

router.use('/add', AddRouter)
router.use('/user', UserRouter)
router.use('/building', BuildingRouter)
router.use('/repair', RepairRouter)
router.use('/heating', HeatingRouter)
router.use('/floor', FloorRouter)
router.use('/room', RoomRouter)
router.use('/bedroom', BedroomRouter)
router.use('/blog', BlogRouter)
router.use('/about', AboutUsRouter)

router.use('/favourites', FavouritesRouter)
router.use('/aboutTown', aboutTownRouter)
router.use('/parking', ParkingRouter)
router.use('/area', AreaRouter)
router.use('/places', PlacesRouter)
router.use('/selection', SelectionRouter)


module.exports = router