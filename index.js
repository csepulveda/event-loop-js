const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.post('/data', require('./routes/post'))
app.get('/', require('./routes/post'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})