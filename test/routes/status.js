const chai = require('chai')
const sinon = require('sinon')
const mongoose = require('mongoose')

chai.should()

describe('Routes: status', () => {
  before(() => {
    sinon.stub(mongoose, 'connect', () => {})
    this.status = require('../../routes/status')
  })
  after(() => {
    mongoose.connect.restore()
  })
  it('should return ok if mongoose is ready', () => {
    // arrange
    const res = {
      send: (status) => {}
    }
    const spy = sinon.spy(res, 'send')
    mongoose.connection.readyState = 1

    // action
    this.status(null, res)

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
    this.status(null, res)

    // assert
    spy.calledWith('ERROR').should.be.true
  })
})
