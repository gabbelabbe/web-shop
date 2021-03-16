const CartModel = require('../models/Cart.model.js')
const ProductModel = require('../models/Product.model.js')

const createCart = async (req, res) => {
  const cart = new CartModel({
    userID: req.session.user._id
  })

  try {
    const dbRes = await cart.save()
    res.status(201).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to create cart.',
      stack: err
    })
  }
}

const getAllCarts = async (req, res) => {
  try {
    const dbRes = await CartModel.find({})
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get carts.',
      stack: err
    })
  }
}

const getCart = async (req, res) => {
  try {
    const dbRes = await CartModel.findById(req.params._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get cart.',
      stack: err
    })
  }
}

const deleteCart = async (req, res) => {
  try {
    const dbRes = await CartModel.findByIdAndDelete(req.body._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to delete cart.',
      stack: err
    })
  }
}

const updateCartProducts = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.productID)
    const cart = await CartModel.findById(req.session.user.cart._id, 'products')
      .populate({
        path: 'products', populate: { path: 'product', select: 'name types price' }
      })

    const itemIndex = cart.products.findIndex(p => p.product._id.equals(req.body.productID))

    if (itemIndex > -1) {
      if (req.body.quantity + cart.products[itemIndex].quantity <= 0) {
        cart.products.splice(itemIndex, 1)
      } else {
        const productItem = cart.products[itemIndex]
        productItem.quantity += req.body.quantity
        cart.products[itemIndex] = productItem
      }
    } else {
      cart.products.push({product: req.body.productID, quantity: req.body.quantity})
    }
    await cart.save()
    product.quantity -= req.body.quantity
    await product.save()
    const serverCart = await CartModel.findById(cart._id, 'products')
      .populate({
        path: 'products', populate: { path: 'product', select: 'name types price' }
      })

    req.session.user.cart = serverCart
    req.session.save((err) => {
      if (err)
        console.error(err)
    })
    return res.status(200).send(serverCart)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update cart.',
      stack: err
    })
  }
}

const clearCart = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.session.user.cart._id, 'products')
      .populate({
        path: 'products', populate: { path: 'product', select: 'name types price' }
      })

    cart.products = []

    await cart.save()

    req.session.user.cart = cart
    req.session.save((err) => {
      if (err)
        console.error(err)
    })
    return res.status(200).send(cart)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to clear cart.',
      stack: err
    })
  }
}

module.exports = {
  createCart,
  deleteCart,
  getAllCarts,
  getCart,
  updateCartProducts,
  clearCart
}