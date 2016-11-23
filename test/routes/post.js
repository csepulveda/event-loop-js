const chai = require('chai')
const sinon = require('sinon')
const post = require('../../routes/post')

chai.should()

describe('Routes: post', () => {
  it('should return status ok if received proper data', () => {
    const req = {
      body: {
        name: 'Darth Vader',
        age: 24,
        ip: '120.152.44.64',
        ssn: '411-90-0070'
      }
    }

    const res = {
      jsonp: (json) => {  }
    }

    const spy = sinon.spy(res, 'jsonp')

    post(req, res)

    spy.calledWith({ status: 'OK' }).should.be.true
  })
})
