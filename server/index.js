import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Middlewares from './middlewares/Middlewares.js'
import Configurations from './configurations/Configurations.js'

const app = express()
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())

app.use(Middlewares.notFound)
app.use(Middlewares.errHandler)

Configurations.connectToDb()
Configurations.connectToPort(app)