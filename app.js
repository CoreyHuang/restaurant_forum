const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000


app.engine('hbs', exphbs({defaultLayout: "main", extname: "hbs"}))
app.set('view engine', 'hbs')

require('./routes')(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})