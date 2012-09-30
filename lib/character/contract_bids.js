var APIMethod = require('../api_method').create();
var ContractBids = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getContractBids(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/ContractBids.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getContractBids = getContractBids;
  return this;
};
ContractBids.prototype = APIMethod;

var contract_bids;

exports.init = function(keyID, vCode, https){
  contract_bids = new ContractBids(keyID, vCode, https);
}
exports.getContractBids = function(callback, eventID, characterID){
  return contract_bids.getContractBids(callback, eventID, characterID);
}
