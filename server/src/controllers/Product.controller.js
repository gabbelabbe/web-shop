const ProductModel = require('../models/Product.model.js')

const createProduct = async (req, res) => {
  const product = new ProductModel({
    name: req.body.name,
    types: req.body.types,
    price: req.body.price,
    quantity: req.body.quantity
  })

  try {
    const dbRes = await product.save()
    res.status(201).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to create product.',
      stack: err
    })
  }
}

const getAllProducts = async (req, res) => {
  try {
    const dbRes = await ProductModel.find({})
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get products.',
      stack: err
    })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const dbRes = await ProductModel.findById(req.params._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to get product.',
      stack: err
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const dbRes = await ProductModel.findByIdAndDelete(req.body._id)
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to delete product.',
      stack: err
    })
  }
}

const changeQuantity = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body._id)
    if (product.quantity + req.body.change >= 0) {
      const dbRes = await ProductModel.findOneAndUpdate({ _id: req.body._id }, { $inc: { quantity: req.body.change } })
      res.status(200).send(dbRes)
    } else {
      res.status(410).send('The product is out of stock.')
    }
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to change quantity.',
      stack: err
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const dbRes = await ProductModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body })
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to update quality.',
      stack: err
    })
  }
}

const queryProduct = async (req, res) => {
  try {
    const dbRes = await ProductModel.find({ name: { $regex: req.query.name } })
    res.status(200).send(dbRes)
  } catch (err) {
    res.status(500).send({
      msg: 'Error while trying to find product.',
      stack: err
    })
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  changeQuantity,
  queryProduct,
  updateProduct
}