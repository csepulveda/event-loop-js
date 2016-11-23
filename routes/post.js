const geoip = require("geoip-native")

module.exports = (req, res) => {
  const countryData = geoip.lookup(req.body.ip)
  let data = Object.assign({
    countryCode: countryData.code,
    countryName: countryData.name
  }, req.body)
  console.log(data)
  res.jsonp({status: 'OK'})
}
