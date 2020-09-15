const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      req.flash('error_messages', '兩次密碼輸入不同！')
      return res.redirect('/signup')
    } else {
      // confirm unique user
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          req.flash('error_messages', '信箱重複！')
          return res.redirect('/signup')
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
          }).then(user => {
            req.flash('success_messages', '成功註冊帳號！')
            return res.redirect('/signin')
          })
        }
      })
    }
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

  getUser: (req, res) => {
    User.findByPk(req.params.id, { raw: true, nest: true })
      .then(user => {
        res.render('userProfile', { userByFind: user })
      })
  },

  editUser: (req, res) => {
    User.findByPk(req.params.id, { raw: true, nest: true })
      .then(user => {
        res.render('editProfile', { userByFind: user })
      })

  },

  putUser: (req, res) => {
    if (Number(req.params.id) !== req.user.id) return res.redirect(`/users/${req.params.id}`)

    const { file } = req
    User.findByPk(req.params.id).then(user => {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, (err, img) => {
          if (err) console.log('Error: ', err)
          return user.update({
            name: req.body.name,
            image: file ? img.data.link : user.image,
          })
            .then((restaurant) => {
              req.flash('success_messages', 'User profile was successfully Updated')
              return res.redirect(`/users/${req.params.id}`)
            })
            .catch(err => console.log(err))
        })
      } else {
        return user.update({
          name: req.body.name,
          image: user.image,
        })
          .then(() => {
            req.flash('success_messages', 'User profile was successfully Updated')
            return res.redirect(`/users/${req.params.id}`)
          })
          .catch(err => console.log(err))
      }
    })
  },
}

module.exports = userController