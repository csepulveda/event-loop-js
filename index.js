const express = require('express')
const app = express()

app.post('/data', require('./routes/post'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})