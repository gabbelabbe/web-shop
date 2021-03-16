const UserModel = require('../models/User.model.js')
const CartModel = require('../models/Cart.model.js')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
  try {
    const cart = new CartModel()
    const cartRes = await cart.save()

    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      userType: 'customer',
      cart: cartRes._id
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    const dbRes = await user.save()
    const serverUser = await UserModel.findById(dbRes._id, 'username email address userType cart')
      .populate({
        path: 'cart', select: 'products', populate: { path: 'products', populate: { path: 'product', select: 'name types price' }}
      })
      
    req.session.user = serverUser
    req.session.save((err) => {
      if (err)
        console.error(err)
    })
    delete serverUser.cartId

    res.status(201).send(serverUser)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to create user.',
      stack: err
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const dbRes = await UserModel.find({}, 'username email address userType')
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get users.',
      stack: err
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const dbRes = await UserModel.findByIdAndDelete((req.session.user ? req.session.user._id : req.body._id))
    const cartRes = await CartModel.findByIdAndDelete(dbRes.cart)
    req.session.user = null
    req.session.save((err) => {
      if (err)
        console.error(err)
    })
    delete dbRes.password
    res.status(200).send({user: dbRes, cart: cartRes})
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to delete user.',
      stack: err
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.session.user._id, 'username email address password')
    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)

    if (validPassword) {
      const salt = await bcrypt.genSalt(10)
      const newPwd = await bcrypt.hash(req.body.newPassword, salt)
      
      const newUserInfo = {...req.body}
      delete newUserInfo.oldPassword
      delete newUserInfo.newPassword
      delete newUserInfo.cart
      newUserInfo.password = newPwd
      
      await UserModel.updateOne({ _id: req.body._id }, { ...newUserInfo })
      const signedInUser = await (await UserModel.findById(newUserInfo._id, 'username email address userType cart'))
        .populate({
          path: 'cart', select: 'products', populate: { path: 'products', populate: { path: 'product', select: 'name types price' }}
        })

      req.session.user = signedInUser
      req.session.save((err) => {
        if (err)
          console.error(err)
      })
      return res.status(200).send(signedInUser)
    } else {
      return res.status(401).send('Old password didnt add up')
    }
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update password.',
      stack: err
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username}, 'username email address password')
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (validPassword) {
      const signedInUser = await UserModel.findById(user._id, 'username email address userType cart')
        .populate({
          path: 'cart', select: 'products', populate: { path: 'products', populate: { path: 'product', select: 'name types price' }}
        })

      req.session.user = signedInUser
      req.session.save((err) => {
        if (err)
          console.error(err)
      })
      return res.status(200).send(signedInUser)
    } else {
      return res.status(400).send({msg: 'Incorrect password or username'})
    }
  } catch (err) {
    return res.status(500).send({
      msg: 'Error while trying to log you in.',
      stack: err
    })
  }
}

const adminUpdateUser = async (req, res) => {
  try {
    const dbRes = await UserModel.updateOne({ _id: req.body._id }, {...req.body})
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update userinfo.',
      stack: err
    })
  }
}

const signOut = async (req, res) => {
  try {
    req.session.user = null
    req.session.save((err) => {
      if (err)
        console.error(err)
    })
    res.status(200).send('Logged Out')
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to logout.',
      stack: err
    })
  }
}

const createSession = async (req, res) => {
  try {
    req.session.user = req.body
    req.session.save((err) => {
      if (err)
        console.error(err)
    })
    res.status(200).send('session created')
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to create session.',
      stack: err
    })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  loginUser,
  adminUpdateUser,
  signOut,
  createSession
}