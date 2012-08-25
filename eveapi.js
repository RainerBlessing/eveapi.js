var accountStatus = require('./lib/account_status');

var EveApi = function(keyID, vCode){
  accountStatus.init(keyID, vCode);
  
  //Public Functions
  this.getAccountStatus = accountStatus.getAccountStatus;
  return this;
};

exports.create = function create(keyID, vCode){
 var eveApi= new EveApi(keyID, vCode);
 return eveApi;
}
