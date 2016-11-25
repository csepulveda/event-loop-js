const chai = require('chai')
const sinon = require('sinon')
const status = require('../../routes/status')

chai.should()

describe('Routes: status', () => {
  it('should return ok', () => {
    // arrange
    const res = {
      send: (status) => {}
    }
    const spy = sinon.spy(res, 'send')

    // action
    status(null, res)

    // assert
    spy.calledWith('OK').should.be.true
  })
})
