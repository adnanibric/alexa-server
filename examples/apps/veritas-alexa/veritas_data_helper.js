'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var Drupal = require('drupal-services-api');
var ENDPOINT = 'http://qasecure.veritasgenetics.com';
var client = new Drupal('http://qasecure.veritasgenetics.com/api');
var logged_user = {};
client.login('testing@testingtestg.com', 'testing@testingtestg.com').then(function(user) {logged_user = user;});

function VeritasDataHelper() {}

VeritasDataHelper.prototype.requestDiseaseByName = function(disease) {
  return this.getDiseaseInfo(disease).then(
    function(response) {
      return response.body;
    }
  );
};

VeritasDataHelper.prototype.requestDiseasesList = function() {
  return this.getDiseasesList().then(
    function(response) {
      return response.body;
    }
  );
};

VeritasDataHelper.prototype.getDiseasesList = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT + '/results.php?view=get_diseases',
    headers: {
        'Cookie': logged_user.session_name+'='+logged_user.sessid

    },
    resolveWithFullResponse: true,
    json: true
  };
  console.log(options);
  return rp(options);
};


VeritasDataHelper.prototype.getDiseaseInfo = function(disease) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + '/results.php?view=phenotype_user_export',
    headers: {
        'Cookie': logged_user.session_name+'='+logged_user.sessid

    },
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

module.exports = VeritasDataHelper;