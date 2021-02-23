import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'

const app = express()
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())

const isAdmin = (req, res, next) => {
  console.log('is admin')
  next()
}

app.get('/', (req, res) => {
  res.send('yeetus')
})

app.get('/dice', isAdmin, (req, res) => {
  res.send(Math.round(Math.random() * 6).toString())
})

mongoose.connect('mongodb://localhost/namndb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to db'))
  .catch((err) => {
    console.error(err)
    process.exit()
  })

app.listen(3001, () => {
  console.log('listening on port ' + 3001)
})

export default app