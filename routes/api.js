const model = require('../model')

module.exports = (req, res) => {
  model.Data.find().sort('-_id').limit(10).select('_id').exec((err, data) => {
    res.jsonp({data: data})
  })
}