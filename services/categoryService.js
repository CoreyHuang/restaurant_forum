const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const categoryService = {
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "Category didn't exist" })
    }
    return Category.create({ name: req.body.name })
      .then((category) => {
        return callback({ status: 'success', message: "Category was successfully created" })
      })
  },

  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "Category didn't exist" })
    }
    return Category.findByPk(req.params.id)
      .then((category) => {
        category.update(req.body)
          .then((category) => {
            return callback({ status: 'success', message: "Category was successfully to update" })
          })
      })
  },


}

module.exports = categoryService