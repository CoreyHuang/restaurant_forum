const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const db = require('./models') 
const bodyParser = require('body-parser')
const PORT = 3000


app.engine('hbs', exphbs({defaultLayout: "main", extname: "hbs"}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app)

app.listen(PORT, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${PORT}!`)
})