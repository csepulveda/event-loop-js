const chai = require('chai')
const sinon = require('sinon')
const mock = require('mock-require')
const JobQ = require('jobq')

let count = 0
const request = {
  post: (url, data, cb) => {
    return count++ ? null : cb(true)
  }
}
mock('request', request)

chai.should()

describe('Lib: generateData', () => {
  afterEach(() => {
    JobQ.prototype.on.restore()
  })
  it('should call request.post and emit event jobFinish', (done) => {
    const spy = sinon.spy(request, 'post')
    const spyJob = sinon.spy(JobQ.prototype, 'on')

    const queue = require('../../lib/generateData')

    setTimeout(function () {
      spy.calledOnce.should.equal.true
      const call = spy.getCall(0)
      call.args.should.have.lengthOf(3)
      call.args[0].should.be.an('string')
      call.args[1].should.be.an('object')
      call.args[1].form.name.should.be.an('string')
      call.args[1].form.ip.should.be.an('string')
      spyJob.called.should.be.true
      done()
    }, 500)

  })
})
