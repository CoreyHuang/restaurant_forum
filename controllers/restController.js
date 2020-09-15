const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

let restController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ include: Category }).then(restaurants => {
      console.log('restaurants', restaurants[0].Category.dataValues.name)
      console.log('restaurants', restaurants[0].Category.name)
      // console.log('restaurants', restaurants[0].dataValues.description.substring(0, 50))
      const data = restaurants.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50),
        categoryName: r.Category.name
      }))
      // console.log('data', data[0])
      return res.render('restaurants', {
        restaurants: data
      })
    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => {
      // console.log('restaurant.toJSON()', restaurant.toJSON())
      return res.render('restaurant', {
        restaurant: restaurant.toJSON()
      })
    })
  }
}
module.exports = restController