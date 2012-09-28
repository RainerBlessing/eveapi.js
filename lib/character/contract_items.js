var APIMethod = require('../api_method').create();
var ContractItems = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getContractItems(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/ContractItems.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getContractItems = getContractItems;
  return this;
};
ContractItems.prototype = APIMethod;

var contractItems;

exports.init = function(keyID, vCode, https){
  contractItems = new ContractItems(keyID, vCode, https);
}
exports.getContractItems = function(callback, eventID, characterID){
  return contractItems.getContractItems(callback, eventID, characterID);
}
