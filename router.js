const router=require('express').Router()

const userController = require('./controller/userController')
const categoryController = require('./controller/categoryController')
const productController = require('./controller/productController')
const middleware = require('./middleware/auth').userAuth
const cartController = require('./controller/cartController')
const orderController = require('./controller/orderController')


router.post('/register',userController.register)
router.post('/login',userController.login)

router.post('/addcategory',categoryController.addCategory)
router.get('/viewcategory',categoryController.viewCategory)

router.post('/addproduct',productController.addProduct)
router.get('/productlist',productController.productList)
router.get('/viewsingleproduct',productController.viewsingleProduct)

router.use(middleware)

router.post('/addtocart',cartController.addtocart)
router.get('/viewcart',cartController.viewcart)
router.post('/updatecart/:productId',cartController.updatecart)
router.delete('/removeitem/:productId',cartController.removeitem)


router.post('/placeorder',orderController.placeorder)
router.get('/vieworderhistory/:userId',orderController.vieworderhistory)
router.get('/vieworderbyid/:orderId',orderController.vieworderbyid)



module.exports = router