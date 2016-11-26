let count = 0

module.exports = (req, res, next) => {
  count++
  next()
}

const logInterval = setInterval(() => {
  console.log('Requests last second', count)
  count = 0
}, 1000)

process.on('SIGINT', function() {
   clearInterval(logInterval)
   process.exit()
});