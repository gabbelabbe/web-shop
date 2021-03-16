const dotenv = require('dotenv')

dotenv.config()

const notFound = (req, res, next) => {
  const error = new Error('invalid URL - NOT FOUND ' + req.originalUrl)
  res.status(404)
  next(error)
}

const errHandler = (error, req, res) => {
  const statusCode = res.statusCode.toString()[0] === '2' || res.statusCode.toString()[0] === '3' ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    statusCode: statusCode,
    msg: error.message,
    stackTrace: process.env.ENVIROMENT === 'dev' ? error.stack : null
  })
}

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.userType === 'admin') {
    next()
  } else {
    res.status(401).send('You are not admin >:(')
  }
}

const sameUserSignedIn = (req, res, next) => {
  if (req.session.user && req.session.user._id.toString() === req.body._id) {
    next()
  } else {
    res.status(401).send('You are not this user!')
  }
}

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).send('You are not signed in!')
  }
}

const isLoggedOut = (req, res, next) => {
  if (!req.session.user) {
    next()
  } else if (req.session.user) {
    res.status(200).send('session already exists')
  } else {
    res.status(401).send('You are already signed in!')
  }
}

module.exports = {
  notFound,
  errHandler,
  isAdmin,
  sameUserSignedIn,
  isLoggedIn,
  isLoggedOut
}