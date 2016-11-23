const gm = require('gm')

module.exports = (req, res, next) => {
  gm(__dirname + '/../image/McLovin.jpg')
  .fontSize('14')
  .stroke('#000', 1)
  .drawText(217, 75, 'SSN')
  .drawText(14, 223, 'Name')
  .drawText(14, 237, 'Address')
  .drawText(14, 250, 'city country')
  .stream((err, stdout, stderr) => {
    if (err) return next(err)
    stdout.pipe(res)
    stdout.on('error', next)
  })
}  // 417x266