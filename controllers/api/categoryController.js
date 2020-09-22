const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category

const categoryService = require('../../services/categoryService')

const categoryController = {
  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
        return res.json(data)
    })
  },

  
}

module.exports = categoryController