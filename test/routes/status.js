const chai = require('chai')
const sinon = require('sinon')
const mock = require('mock-require')

chai.should()

const mongoose = {
  connection: {}
}
mock('mongoose', mongoose)

const status = require('../../routes/status')

describe('Routes: status', () => {
  it('should return ok if mongoose is ready', () => {
    // arrange
    const res = {
      send: (status) => {}
    }
    const spy = sinon.spy(res, 'send')
    mongoose.connection.readyState = 1

    // action
    status(null, res)

    // assert
    spy.calledWith('OK').should.be.true
  })
  it('should return error if mongoose is not ready', () => {
    // arrange
    const res = {
      send: (status) => {},
      status: function (code) { return this }
    }
    const spy = sinon.spy(res, 'send')
    mongoose.connection.readyState = 0

    // action
    status(null, res)

    // assert
    spy.calledWith('ERROR').should.be.true
  })
})
