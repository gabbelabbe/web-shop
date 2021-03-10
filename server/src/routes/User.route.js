const UserController = require('../controllers/User.controller.js')
const Middlewares = require('../middlewares/Middlewares.js')

const routes = (app) => {
  app.post('/user/create', UserController.createUser)

  app.post('/user/login', UserController.loginUser)

  app.post('/user/logout', UserController.signOut)

  app.get('/users', Middlewares.isAdmin, UserController.getAllUsers)

  app.delete('/user', UserController.deleteUser)

  app.put('/user/change/password', UserController.changePwd)

  app.put('/user/change', Middlewares.isAdmin, UserController.updateUser)
}

module.exports = {
  routes
}