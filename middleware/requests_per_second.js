let count = 0

module.exports = (req, res, next) => {
  count++
  next()
}

setInterval(() => {
  console.log('Requests last second', count)
  count = 0
}, 1000)