const chai = require('chai')
const sinon = require('sinon')
const geoip = require('geoip-native')
const mongoose = require('mongoose')

chai.should()

describe('Model: Data', () => {
  before(() => {
    sinon.stub(mongoose, 'connect', () => {})
    this.model = require('../../model')
  })
  after(() => {
    mongoose.connect.restore()
  })
  it('should return mongoose schema', () => {
    // arrange
    //act
    //assert
    this.model.Data.should.not.be.undefined
    this.model.Data.modelName.should.be.equal('data')
    this.model.Data.schema.should.be.an.instanceof(mongoose.Schema)
    this.model.Data.schema.obj.should.have.property('name')
    this.model.Data.schema.obj.should.have.property('age')
    this.model.Data.schema.obj.should.have.property('ip')
    this.model.Data.schema.obj.should.have.property('ssn')
    this.model.Data.schema.obj.should.have.property('countryName')
    this.model.Data.schema.obj.should.have.property('countryCode')
    this.model.Data.schema.obj.should.have.property('image')
  })
})
