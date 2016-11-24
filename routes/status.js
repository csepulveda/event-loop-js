const mongoose = require('mongoose')

module.exports = (req, res) => {
  if (mongoose.connection.readyState !== 1)
    res.status(500).send('ERROR')
  else
    res.send('OK')
}