const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))

if (process.env.DEBUG) app.use(require('./middleware/requests_per_second'))
app.use(bodyParser.urlencoded({extended: true}))
app.post('/data', require('./routes/post'))
app.get('/image/:image_id?', require('./routes/image'))
app.get('/status', require('./routes/status'))
app.get('/api/images', require('./routes/api'))

app.listen(process.env.PORT || 8081, function () {
  console.log(`Example app listening on port ${process.env.PORT || 8081}!`)
  process.send('ready')
})