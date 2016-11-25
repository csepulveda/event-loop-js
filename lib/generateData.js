const dream = require('dreamjs')
const JobQ = require('jobq')
const request = require('request')

dream.schema('User', {
  name: 'name',
  age: 'age',
  city: 'city',
  ip: 'ip',
  address: 'address',
  phone: 'phone',
  ssn: 'ssn'
})

const url = process.env.TARGET || 'http://127.0.0.1:3000/data'

new JobQ({
  source: () => dream.generateRnd().output(),
  process: (data, cb) => {
    request.post(url, {form: data}, cb)
  },
  maxProceses: process.env.MAX_PROCESSES || 1
})
.on('jobFinish', (info) => console.log(info.result.body))
.on('error', console.log)
.start()
