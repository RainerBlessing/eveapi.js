var APIMethod = require('../api_method').create();
var AccountBalance = function(keyID, vCode){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result/rowset');
      this.getRowset = require('../api_result').getRowsetFunction(rowsetElements);
      return this;
  };

  function getAccountBalance(callback, characterID){
    var apiPath = '/char/AccountBalance.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath);
    this.getResponse(callback, Result);
  } 
  this.getAccountBalance = getAccountBalance;
  return this;
};
AccountBalance.prototype = APIMethod;

var apiKeyInfo;

exports.init = function(keyID, vCode){
  account_balance = new AccountBalance(keyID, vCode);
}
exports.getAccountBalance = function(callback, characterID){
  return account_balance.getAccountBalance(callback, characterID);
}
