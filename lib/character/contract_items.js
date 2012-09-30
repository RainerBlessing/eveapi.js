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

var contract_items;

exports.init = function(keyID, vCode, https){
  contract_items = new ContractItems(keyID, vCode, https);
}
exports.getContractItems = function(callback, eventID, characterID){
  return contract_items.getContractItems(callback, eventID, characterID);
}
