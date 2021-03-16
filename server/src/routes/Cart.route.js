const CartController = require('../controllers/Cart.controller.js')
const Middlewares = require('../middlewares/Middlewares.js')

const routes = (app) => {
  app.get('/carts', CartController.getAllCarts)

  app.get('/cart/:_id', CartController.getCart)

  app.post('/cart', CartController.createCart)
  
  app.put('/cart/update', Middlewares.isLoggedIn, CartController.updateCartProducts)
    
  app.delete('/cart', CartController.deleteCart)
}

module.exports = {
  routes
}