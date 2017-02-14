'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var VeritasDataHelper = require('../veritas_data_helper');
chai.config.includeStack = true;

describe('VeritasDataHelper', function() {
  var subject = new VeritasDataHelper();
  describe('#getBundles', function() {
    context('get all bundles', function() {
      it('returns all bundles', function() {
        var disease_name = 'Endocrinology';
        var value = subject.requestDiseaseByName(disease_name).then(function(obj) {
          return obj;
        });
        //return expect(value).to.eventually.eq(disease_name);
        return value;
      });
    });
  });
  });