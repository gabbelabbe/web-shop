const UserController = require('../controllers/User.controller.js')
const Middlewares = require('../middlewares/Middlewares.js')

const routes = (app) => {
  app.post('/user/create', UserController.createUser)

  app.post('/user/login', UserController.loginUser)

  app.post('/user/logout', UserController.signOut)

  app.post('/user/session', Middlewares.isLoggedOut, UserController.createSession)

  app.get('/users', Middlewares.isAdmin, UserController.getAllUsers)

  app.delete('/user', UserController.deleteUser)

  app.put('/user/update', Middlewares.sameUserSignedIn, UserController.updateUser)

  app.put('/user/admin/update', Middlewares.isAdmin, UserController.adminUpdateUser)
}

module.exports = {
  routes
}