const express = require('express')

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
  res.send('Hello ' + req.body.name)
})

app.listen(3001)