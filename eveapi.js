var accountStatus = require('./lib/account/account_status');
var apiKeyInfo = require('./lib/account/api_key_info');

var EveApi = function(keyID, vCode){
  accountStatus.init(keyID, vCode);
  apiKeyInfo.init(keyID, vCode);
  
  //Public Functions
  this.getAccountStatus = accountStatus.getAccountStatus;
  this.getAPIKeyInfo = apiKeyInfo.getAPIKeyInfo;
  return this;
};

exports.create = function create(keyID, vCode){
 var eveApi= new EveApi(keyID, vCode);
 return eveApi;
}
