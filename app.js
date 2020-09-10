const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const db = require('./models') 
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const PORT = process.env.PORT || 3000
const passport = require('./config/passport')
const methodOverride = require('method-override')
// console.log("passport check")

app.engine('hbs', exphbs({defaultLayout: "main", extname: "hbs"}))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/upload', express.static(__dirname + '/upload'))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user 
  // console.log("res.session", req.session)
  next()
})

require('./routes')(app, passport)

app.listen(PORT, () => {
  // db.sequelize.sync()
  console.log(`Example app listening on port ${PORT}!`)
})