const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const Middlewares = require('./src/middlewares/Middlewares.js')
const Configurations = require('./configurations/Configurations.js')
const UserRoutes = require('./src/routes/User.route.js')
const ProductRoutes = require('./src/routes/Product.route.js')
const CartRoute = require('./src/routes/Cart.route.js')

// Config server
const app = express()
if (process.env.ENVIROMENT !== 'dev') {
  app.set('trust proxy', 1)
}
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: Configurations.store,
  proxy: process.env.ENVIROMENT !== 'dev',
  cookie: { secure: process.env.ENVIROMENT !== 'dev', maxAge: 3600000, sameSite: process.env.ENVIROMENT !== 'dev' ? 'none' : 'lax' },
}))
app.use(helmet())
app.use(morgan('common'))
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// Routes
UserRoutes.routes(app)
ProductRoutes.routes(app)
CartRoute.routes(app)

// Error handlers
app.use(Middlewares.notFound)
app.use(Middlewares.errHandler)

// Connect to mongo and start server
Configurations.connectToDb()
Configurations.connectToPort(app)

module.exports = app