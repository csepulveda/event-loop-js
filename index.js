const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(require('./middleware/requests_per_second'))
app.use(bodyParser.urlencoded({extended: true}))

app.post('/data', require('./routes/post'))
app.get('/', require('./routes/image'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  process.send('ready')
})