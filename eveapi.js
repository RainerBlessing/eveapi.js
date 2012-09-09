var accountStatus = require('./lib/account/account_status');
var apiKeyInfo = require('./lib/account/api_key_info');
var characters = require('./lib/account/characters');
var accountBalance = require('./lib/character/account_balance');
var assetList = require('./lib/character/asset_list');
var upcomingCalendarEvents = require('./lib/character/upcoming_calendar_events');

var EveApi = function(keyID, vCode){
  var https = require('./lib/https_stub');
  accountStatus.init(keyID, vCode, https);
  apiKeyInfo.init(keyID, vCode, https);
  characters.init(keyID, vCode, https);
  accountBalance.init(keyID, vCode, https);
  assetList.init(keyID, vCode, https);
  upcomingCalendarEvents.init(keyID, vCode, https);
 
  this.account = {}; 
  this.character = {}; 
  
  //Public Functions
  this.account.getAccountStatus = accountStatus.getAccountStatus;
  this.account.getAPIKeyInfo = apiKeyInfo.getAPIKeyInfo;
  this.account.getCharacters = characters.getCharacters;

  this.character.getAccountBalance = accountBalance.getAccountBalance;
  this.character.getAssetList = assetList.getAssetList;
  this.character.getUpcomingCalendarEvents = upcomingCalendarEvents.getUpcomingCalendarEvents;

  return this;
};

exports.create = function create(keyID, vCode){
 var eveApi= new EveApi(keyID, vCode);
 return eveApi;
}
