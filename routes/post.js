const geoip = require('geoip-native')
const gm = require('gm')

module.exports = (req, res, next) => {
  const countryData = geoip.lookup(req.body.ip)
  let data = Object.assign({
    countryCode: countryData.code,
    countryName: countryData.name
  }, req.body)
  gm(__dirname + '/../image/McLovin.jpg')
  .fontSize('14')
  .stroke('#000', 1)
  .drawText(217, 75, data.ssn)
  .drawText(14, 223, data.name)
  .drawText(14, 237, data.address)
  .drawText(14, 250, data.city)
  .stream((err, stdout, stderr) => {
    if (err) return next(err)
    let image = []
    stdout.on('data', (chunk) => {
      image.push(chunk)
    }).on('end', () => {
      data.image = Buffer.concat(image)
      // console.log(data)
    })
    res.jsonp({status: 'OK'})
  })
}
