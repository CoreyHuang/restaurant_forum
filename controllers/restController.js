const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User
const pageLimit = 10

let restController = {
  getRestaurants: (req, res) => {
    let offset = 0
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }

    let whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }

    Restaurant.findAndCountAll({ include: Category, where: whereQuery, offset: offset, limit: pageLimit })
      .then(result => {
        let page = Number(req.query.page) || 1
        let pages = Math.ceil(result.count / pageLimit)
        let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
        let prev = page - 1 < 1 ? 1 : page - 1
        let next = page + 1 > pages ? pages : page + 1
        // console.log('result', result.rows[0])
        // console.log('result - 2', result.rows[0].dataValues.Category)
        // console.log('result - 3', result.rows[0].dataValues.Category.dataValues.name)
        // console.log('result - 4', result.rows[0].dataValues.Category.name)
        const data = result.rows.map(r => ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          categoryName: r.dataValues.Category.name  //?
        }))
        Category.findAll({
          raw: true,
          nest: true
        }).then(categories => {
          // console.log('page', page)
          // console.log('totalPage',typeof totalPage[0])
          // console.log('totalPage', totalPage)
          // console.log('prev', prev)
          // console.log('next', next)

          return res.render('restaurants', {
            restaurants: data,
            categories: categories,
            categoryId: categoryId,
            page: page,
            totalPage: totalPage,
            prev: prev,
            next: next
          })
        })
        // return res.render('restaurants', {
        //   restaurants: data
        // })
      })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      // include: Category
      include: [
        Category,
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      // restaurant.increment(['viewCounts'], { by: 1 });
      restaurant.increment({
        'viewCounts': 1,
      });
      return res.render('restaurant', {
        restaurant: restaurant.toJSON()
      })
    })
  },

  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      raw: true,
      nest: true,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      console.log('restaurants', restaurants[0])
      Comment.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        console.log('comments', comments[0])
        return res.render('feeds', {
          restaurants: restaurants,
          comments: comments
        })
      })
    })
  },

  getDashboard: (req, res) => {
    Restaurant.findAndCountAll({ raw: true, nest: true, include: [Comment,Category], where: { id: req.params.id } })
    // Restaurant.findByPk(req.params.id, {  => 使用model answer只會撈出一筆!?
    //   include: [Category, { model: Comment, include: [User] }], raw: true, nest: true,})  
    .then((restaurant) => {
      res.render('restDashboard', { restaurant: restaurant.rows[0], restComment: restaurant.count })
      })

  }
}
module.exports = restController