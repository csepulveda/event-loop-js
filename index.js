const express = require('express')
const app = express()
const bodyParser = require('body-parser')

if (process.env.DEBUG) app.use(require('./middleware/requests_per_second'))
app.use(bodyParser.urlencoded({extended: true}))

app.post('/data', require('./routes/post'))
app.get('/image/:image_id?', require('./routes/image'))
app.get('/status', require('./routes/status'))

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
  process.send('ready')
})