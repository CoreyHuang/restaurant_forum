const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant
// console.log(passport)

// setup passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, username, password, cb) => {
    // console.log('test in passport')
    User.findOne({ where: { email: username } }).then(user => {
      if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
      if (!bcrypt.compareSync(password, user.password)) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
      return cb(null, user)
    })
  }
))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    // raw: true, nest: true,
    include: [{ model: Restaurant, as: 'FavoritedRestaurants' },
    { model: Restaurant, as: 'LikedRestaurants' }]
  }).then(user => {
    console.log("deserializeUser - user", user)
    // user = user.toJSON() // 此處與影片示範不同
    console.log("deserializeUser - user 2", user)
    return cb(null, user.toJSON())
  })
})

module.exports = passport