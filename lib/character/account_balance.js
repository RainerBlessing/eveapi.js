var APIMethod = require('../api_method').create();
var AccountBalance = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getAccountBalance(callback, characterID){
    var apiPath = '/char/AccountBalance.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getAccountBalance = getAccountBalance;
  return this;
};
AccountBalance.prototype = APIMethod;

var account_balance;

exports.init = function(keyID, vCode, https){
  account_balance = new AccountBalance(keyID, vCode, https);
}
exports.getAccountBalance = function(callback, characterID){
  return account_balance.getAccountBalance(callback, characterID);
}
