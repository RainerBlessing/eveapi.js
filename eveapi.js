var accountStatus = require('./lib/account/account_status');
var apiKeyInfo = require('./lib/account/api_key_info');
var characters = require('./lib/account/characters');
var accountBalance = require('./lib/character/account_balance');

var EveApi = function(keyID, vCode){
  accountStatus.init(keyID, vCode);
  apiKeyInfo.init(keyID, vCode);
  characters.init(keyID, vCode);
  accountBalance.init(keyID, vCode);
 
  this.account = {}; 
  this.character = {}; 
  
  //Public Functions
  this.account.getAccountStatus = accountStatus.getAccountStatus;
  this.account.getAPIKeyInfo = apiKeyInfo.getAPIKeyInfo;
  this.account.getCharacters = characters.getCharacters;

  this.character.getAccountBalance = accountBalance.getAccountBalance;

  return this;
};

exports.create = function create(keyID, vCode){
 var eveApi= new EveApi(keyID, vCode);
 return eveApi;
}
