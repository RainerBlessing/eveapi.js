var APIMethod = require('../api_method').create();
var Contracts = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getContracts(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/Contracts.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getContracts = getContracts;
  return this;
};
Contracts.prototype = APIMethod;

var contracts;

exports.init = function(keyID, vCode, https){
  contracts = new Contracts(keyID, vCode, https);
}
exports.getContracts = function(callback, eventID, characterID){
  return contracts.getContracts(callback, eventID, characterID);
}
