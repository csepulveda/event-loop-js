model = require('../model')

module.exports = (req, res, next) => {
  let filters = {}
  if (req.params.image_id) filters._id = req.params.image_id
  model.Data.findOne(filters).sort('-_id').exec((err, data) => {
    if (err || !data) {
      return next()
    }
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.end(data.image)
  })
}