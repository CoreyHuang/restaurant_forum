const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const adminService = require('../services/adminService')

const adminController = {

  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },

  createRestaurant: (req, res) => {
    // return res.render('admin/create')
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', {
        categories: categories
      })
    })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data.status === "error") {
        req.flash('error_messages', data.message)
        return res.redirect('back')
      }
      req.flash('success_messages', data.message)
      return res.redirect('/admin/restaurants')
    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { raw: true, nest: true, include: [Category] }).then(restaurant => {
      return res.render('admin/restaurant', {
        restaurant: restaurant
      })
    })
  },

  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return Restaurant.findByPk(req.params.id, { raw: true }).then(restaurant => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant
        })
      })
    })
    // return Restaurant.findByPk(req.params.id, { raw: true }).then(restaurant => {
    //   return res.render('admin/create', { restaurant: restaurant })
    // })
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data.status === 'error') {
        req.flash('error_messages', data.message)
        return res.redirect('back')
      }
      req.flash('success_messages', data.message)
      res.redirect('/admin/restaurants')
    })
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data.status === 'success')
        return res.redirect('/admin/restaurants')
    })
  },

  getUsers: (req, res) => {
    return User.findAll({ raw: true })
      .then(users => {
        return res.render('admin/users', { users })
      })
      .catch(err => console.log(err))
  },

  putUsers: (req, res) => {
    return User.findByPk(req.params.id)
      .then(user => {
        const isAdmin = !user.isAdmin
        user.update({ isAdmin })
          .then(() => {
            req.flash('success_messages', 'User authority was successfully to update')
            return res.redirect('back')
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  },
}

module.exports = adminController