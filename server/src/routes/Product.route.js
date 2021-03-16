const ProductController = require('../controllers/Product.controller.js')
const Middlewares = require('../middlewares/Middlewares.js')

const routes = (app) => {
  app.get('/products', ProductController.getAllProducts)

  app.get('/product/search', ProductController.queryProduct)

  app.get('/product/:_id', ProductController.getOneProduct)

  app.post('/product', Middlewares.isAdmin, ProductController.createProduct)
  
  app.put('/product/quantity', ProductController.changeQuantity)
    
  app.put('/product', Middlewares.isAdmin, ProductController.updateProduct)
  
  app.delete('/product', Middlewares.isAdmin, ProductController.deleteProduct)
}

module.exports = {
  routes
}