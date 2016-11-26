const chai = require('chai')
const sinon = require('sinon')
const geoip = require('geoip-native')
const mongoose = require('mongoose')

chai.should()

describe('Model: Data', () => {
  before(() => {
    sinon.stub(mongoose, 'connect', () => {})
    model = require('../../model')
  })
  after(() => {
    mongoose.connect.restore()
  })
  it('should return mongoose schema', () => {
    // arrange
    //act
    //assert
    model.Data.should.not.be.undefined
    model.Data.modelName.should.be.equal('data')
    model.Data.schema.should.be.an.instanceof(mongoose.Schema)
    model.Data.schema.obj.should.have.property('name')
    model.Data.schema.obj.should.have.property('age')
    model.Data.schema.obj.should.have.property('ip')
    model.Data.schema.obj.should.have.property('ssn')
    model.Data.schema.obj.should.have.property('countryName')
    model.Data.schema.obj.should.have.property('countryCode')
    model.Data.schema.obj.should.have.property('image')
  })
})
