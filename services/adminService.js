const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {

  getRestaurants: (req, res, callback) => {

    return Restaurant.findAll({ raw: true, nest: true, include: [Category] })
      .then(restaurants => {
        return callback({ restaurants })
      })
  },

  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { raw: true, nest: true, include: [Category] }).then(restaurant => {
      return callback({ restaurant })
    })
  },

  getCategories: (req, res, callback) => {
    return Category.findAll({ raw: true, nest: true })
      .then(categories => {
        return callback({ categories })
      })
  },

  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
      })
  },

}

module.exports = adminService