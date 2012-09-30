var APIMethod = require('../api_method').create();
var WalletTransactions = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getWalletTransactions(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/WalletTransactions.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getWalletTransactions = getWalletTransactions;
  return this;
};
WalletTransactions.prototype = APIMethod;

var wallet_transactions;

exports.init = function(keyID, vCode, https){
  wallet_transactions = new WalletTransactions(keyID, vCode, https);
}
exports.getWalletTransactions = function(callback, eventID, characterID){
  return wallet_transactions.getWalletTransactions(callback, eventID, characterID);
}
