import ProductController from '../controllers/Product.controller.js'

const routes = (app) => {
  app.get('/products', ProductController.getAllProducts)

  app.get('/product/search', ProductController.queryProduct)

  app.get('/product/:_id', ProductController.getOneProduct)

  app.post('/product', ProductController.createProduct)
  
  app.put('/product/quantity', ProductController.changeQuantity)
  
  app.put('/product/price', ProductController.changePrice)
  
  app.delete('/product', ProductController.deleteProduct)
}

export default {
  routes
}