const chai = require('chai')
const sinon = require('sinon')
const model = require('../../model')
const image = require('../../routes/image')

chai.should()

describe('Routes: image', () => {
  afterEach(() => {
    model.Data.findOne.restore()
  })
  it('should return image if found data', (done) => {
    // arrange
    const stub = {
      sort: function () { return this },
      exec: function (callback) { callback(null, { image: new Buffer('') }) }
    }
    const spyQuery = sinon.stub(model.Data, 'findOne', () => stub)
    const spyExec = sinon.spy(stub, 'exec')
    const req = {
      params: { image_id: '123' }
    }
    const res = {
      writeHead: (status, headers) => {
        // assert
        status.should.be.equal(200)
        headers.should.have.property('Content-Type').that.is.equal('image/jpeg')
      },
      end: (image) => {
        // assert
        spyQuery.calledWith({ _id: '123' })
        spyExec.calledOnce.should.be.true
        image.should.be.not.undefined
        done()
      }
    }

    // action
    image(req, res)
  })
  it('should call next if mongoose exec returned error', (done) => {
    // arrange
    const stub = {
      sort: function () { return this },
      exec: function (callback) { callback('Error') }
    }
    sinon.stub(model.Data, 'findOne', () => stub)
    const spy = sinon.spy(stub, 'exec')
    const req = {
      params: {}
    }
    const res = {}
    const next = () => {
      spy.calledOnce.should.be.true
      done()
    }

    // action
    image(req, res, next)
  })
})
