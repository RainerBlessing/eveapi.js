var APIMethod = require('../api_method').create();
var WalletJournal = function(keyID, vCode, https){

  var Result = function(APIMethod, xml){
      var rowsetElements = xml.find('/eveapi/result');
      var apiResult = require('../api_result').init(this,rowsetElements);
      return this;
  };

  function getWalletJournal(callback, eventID, characterID){
    var apiPath;

    apiPath = '/char/WalletJournal.xml.aspx?keyID='+keyID+'&vCode='+vCode+'&characterID='+characterID;
    APIMethod.call(this,apiPath, https);
    this.getResponse(callback, Result);
  } 
  this.getWalletJournal = getWalletJournal;
  return this;
};
WalletJournal.prototype = APIMethod;

var wallet_journal;

exports.init = function(keyID, vCode, https){
  wallet_journal = new WalletJournal(keyID, vCode, https);
}
exports.getWalletJournal = function(callback, eventID, characterID){
  return wallet_journal.getWalletJournal(callback, eventID, characterID);
}
