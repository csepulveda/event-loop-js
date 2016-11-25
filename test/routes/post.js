const chai = require('chai')
const sinon = require('sinon')
const geoip = require('geoip-native')
const model = require('../../model')
const post = require('../../routes/post')

chai.should()

describe('Routes: post', () => {
  before((done) => {
    this.req = {
      body: {
        name: 'Darth Vader',
        address: 'Addres 1, Addres 2, City',
        ip: '120.152.44.64',
        ssn: '411-90-0070'
      }
    }
    let wait = () => {
      setTimeout(() => {
        if (geoip.ready) {
          wait = null
          done()
        } else
          wait()
      }, 5)
    }
    wait()
  })
  afterEach(() => {
    model.Data.prototype.save.restore()
  })
  it('should return status ok if saved succesfully', (done) => {
    // arrange
    const spy = sinon.stub(model.Data.prototype, 'save', (callback) => {
      callback()
    })

    const res = {
      jsonp: (json) => {
        // assert
        json.should.be.deep.equal({ status: 'OK' })
        spy.called.should.be.true
        const call = spy.getCall(0).thisValue
        call.should.have.property('name').that.is.equal('Darth Vader')
        call.should.have.property('ip').that.is.equal('120.152.44.64')
        call.should.have.property('ssn').that.is.equal('411-90-0070')
        call.should.have.property('countryCode').that.is.equal('ID')
        call.should.have.property('countryName').that.is.equal('Indonesia')
        call.should.have.property('image').that.is.an.instanceof(Buffer)
        done()
      },
      status: (code) => {}
    }

    // act
    post(this.req, res)
  })
  it('should return error if could not save', (done) => {
    // arrange
    const spy = sinon.stub(model.Data.prototype, 'save', (callback) => {
      callback('Error')
    })

    const res = {
      jsonp: (json) => {
        // assert
        json.should.be.deep.equal({ status: 'ERROR', data: 'Error' })
        spy.called.should.be.true
        const call = spy.getCall(0).thisValue
        call.should.have.property('name').that.is.equal('Darth Vader')
        call.should.have.property('ip').that.is.equal('120.152.44.64')
        call.should.have.property('ssn').that.is.equal('411-90-0070')
        call.should.have.property('countryCode').that.is.equal('ID')
        call.should.have.property('countryName').that.is.equal('Indonesia')
        call.should.have.property('image').that.is.an.instanceof(Buffer)
        done()
      },
      status: function (code) { return this }
    }

    // act
    post(this.req, res)
  })
})
